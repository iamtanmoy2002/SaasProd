-- Create a function that forces user role update by temporarily disabling RLS
CREATE OR REPLACE FUNCTION force_update_user_role(user_id_param text, new_role text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
  affected_rows integer;
BEGIN
  -- Temporarily disable RLS for this operation
  ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
  
  -- Update the user's role
  UPDATE public.users 
  SET user_type = new_role, updated_at = NOW()
  WHERE user_id = user_id_param;
  
  GET DIAGNOSTICS affected_rows = ROW_COUNT;
  
  -- Re-enable RLS
  ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
  
  IF affected_rows > 0 THEN
    -- Return success
    SELECT json_build_object(
      'success', true,
      'user_id', user_id_param,
      'user_type', new_role,
      'rows_affected', affected_rows,
      'method', 'force_update'
    ) INTO result;
  ELSE
    -- No rows affected, try to insert
    ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
    
    INSERT INTO public.users (
      user_id, 
      email, 
      user_type, 
      token_identifier, 
      created_at, 
      updated_at
    ) VALUES (
      user_id_param,
      (SELECT email FROM auth.users WHERE id = user_id_param::uuid),
      new_role,
      (SELECT email FROM auth.users WHERE id = user_id_param::uuid),
      NOW(),
      NOW()
    );
    
    ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
    
    SELECT json_build_object(
      'success', true,
      'user_id', user_id_param,
      'user_type', new_role,
      'action', 'force_inserted',
      'method', 'force_update'
    ) INTO result;
  END IF;
  
  RETURN result;
END;
$$; 