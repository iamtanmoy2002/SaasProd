-- Secure RLS policies for the users table
-- This maintains security while allowing proper role updates

-- 1. First, let's see the current policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'users';

-- 2. Drop the overly permissive INSERT policy
DROP POLICY IF EXISTS "Users can insert own data" ON public.users;

-- 3. Create a more secure INSERT policy
CREATE POLICY "Users can insert own data" ON public.users
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- 4. Verify the user trigger is working properly
-- This ensures new users are automatically created when they sign up
SELECT 
    trigger_name,
    event_manipulation,
    action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'users';

-- 5. Test that the policies are working correctly
-- This should return your user data
SELECT user_id, email, user_type, created_at 
FROM public.users 
WHERE user_id = auth.uid()::text;

-- 6. Verify all policies are secure
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive, 
    roles, 
    cmd, 
    qual 
FROM pg_policies 
WHERE tablename = 'users'
ORDER BY cmd; 