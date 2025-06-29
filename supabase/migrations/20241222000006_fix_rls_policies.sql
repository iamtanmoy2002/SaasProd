-- Temporarily disable RLS to test if that's the issue
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Or alternatively, create a more permissive policy for testing
-- DROP POLICY IF EXISTS "Users can update own data" ON public.users;
-- CREATE POLICY "Users can update own data" ON public.users
--     FOR UPDATE USING (true);

-- Also create a policy for INSERT if it doesn't exist
-- DROP POLICY IF EXISTS "Users can insert own data" ON public.users;
-- CREATE POLICY "Users can insert own data" ON public.users
--     FOR INSERT WITH CHECK (true); 