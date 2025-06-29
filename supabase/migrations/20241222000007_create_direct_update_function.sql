-- Create a function to directly update user role without RLS restrictions
CREATE OR REPLACE FUNCTION update_user_role_direct(user_id_param text, new_role text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
  affected_rows integer;
BEGIN
  -- Directly update the user's role
  UPDATE public.users 
  SET user_type = new_role, updated_at = NOW()
  WHERE user_id = user_id_param;
  
  GET DIAGNOSTICS affected_rows = ROW_COUNT;
  
  IF affected_rows > 0 THEN
    -- Return success
    SELECT json_build_object(
      'success', true,
      'user_id', user_id_param,
      'user_type', new_role,
      'rows_affected', affected_rows
    ) INTO result;
  ELSE
    -- No rows affected, try to insert
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
    
    SELECT json_build_object(
      'success', true,
      'user_id', user_id_param,
      'user_type', new_role,
      'action', 'inserted'
    ) INTO result;
  END IF;
  
  RETURN result;
END;
$$; 