-- Fix the INSERT policy specifically
-- The current INSERT policy has 'null' as qualifier which is too permissive

-- 1. Drop the current overly permissive INSERT policy
DROP POLICY IF EXISTS "Users can insert own data" ON public.users;

-- 2. Create a secure INSERT policy that only allows users to insert their own data
CREATE POLICY "Users can insert own data" ON public.users
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- 3. Verify the policy was created correctly
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive, 
    roles, 
    cmd, 
    qual 
FROM pg_policies 
WHERE tablename = 'users' AND cmd = 'INSERT';

-- 4. Test that the policy works by trying to insert (this should fail for other users)
-- This is just a verification query
SELECT 
    'INSERT policy test' as test_type,
    CASE 
        WHEN qual IS NOT NULL AND qual != 'null' THEN 'SECURE - Policy has proper qualifier'
        ELSE 'INSECURE - Policy has null qualifier'
    END as security_status,
    qual as current_qualifier
FROM pg_policies 
WHERE tablename = 'users' AND cmd = 'INSERT';

-- 5. Show all policies for verification
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