-- Manual fix for RLS issues - run this in your Supabase SQL editor

-- 1. First, let's see what RLS policies exist
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'users';

-- 2. Temporarily disable RLS to test
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- 3. Create a function that can update user roles
CREATE OR REPLACE FUNCTION force_update_user_role(user_id_param text, new_role text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
  affected_rows integer;
BEGIN
  -- Update the user's role
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

-- 4. Test the function with your user ID (replace with your actual user ID)
-- SELECT force_update_user_role('60e8cb0f-856b-4326-b24d-2463a56d854c', 'listener');

-- 5. Re-enable RLS with proper policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 6. Drop existing policies and create new ones
DROP POLICY IF EXISTS "Users can view own data" ON public.users;
DROP POLICY IF EXISTS "Users can update own data" ON public.users;
DROP POLICY IF EXISTS "Users can insert own data" ON public.users;

-- 7. Create new, more permissive policies
CREATE POLICY "Users can view own data" ON public.users
    FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can update own data" ON public.users
    FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own data" ON public.users
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- 8. Verify the policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'users'; 