-- Create a function to update user role that bypasses RLS
CREATE OR REPLACE FUNCTION update_user_role(user_id_param text, new_role text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
BEGIN
  -- Update the user's role
  UPDATE public.users 
  SET user_type = new_role, updated_at = NOW()
  WHERE user_id = user_id_param;
  
  -- Check if any rows were affected
  IF FOUND THEN
    -- Return the updated user data
    SELECT json_build_object(
      'success', true,
      'user_id', user_id_param,
      'user_type', new_role
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