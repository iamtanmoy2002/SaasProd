-- Force fix the INSERT policy - this is more direct
-- The INSERT policy still has 'null' qualifier which is a security risk

-- 1. First, let's see what's happening with the policy
SELECT 
    policyname,
    cmd,
    qual,
    'Current state' as status
FROM pg_policies 
WHERE tablename = 'users' AND cmd = 'INSERT';

-- 2. Force drop the policy using a different approach
DO $$
BEGIN
    -- Drop the policy if it exists
    IF EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'users' 
        AND policyname = 'Users can insert own data'
    ) THEN
        EXECUTE 'DROP POLICY "Users can insert own data" ON public.users';
        RAISE NOTICE 'Dropped existing INSERT policy';
    ELSE
        RAISE NOTICE 'No existing INSERT policy found';
    END IF;
END $$;

-- 3. Create the secure policy
CREATE POLICY "Users can insert own data" ON public.users
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- 4. Verify the new policy
SELECT 
    policyname,
    cmd,
    qual,
    CASE 
        WHEN qual = '((auth.uid())::text = user_id)' THEN 'SECURE - Policy applied correctly'
        WHEN qual = 'null' THEN 'INSECURE - Policy still has null qualifier'
        ELSE 'UNKNOWN - Check the qualifier'
    END as security_status
FROM pg_policies 
WHERE tablename = 'users' AND cmd = 'INSERT';

-- 5. Show all policies for final verification
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