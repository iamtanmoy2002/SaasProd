-- Add RLS policy for UPDATE operations on users table
DO $$
BEGIN
    -- Check if the policy for users UPDATE exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'users' 
        AND policyname = 'Users can update own data'
    ) THEN
        -- Create policy to allow users to update only their own data
        EXECUTE 'CREATE POLICY "Users can update own data" ON public.users
                FOR UPDATE USING (auth.uid()::text = user_id)';
    END IF;

    -- Check if the policy for users INSERT exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'users' 
        AND policyname = 'Users can insert own data'
    ) THEN
        -- Create policy to allow users to insert their own data
        EXECUTE 'CREATE POLICY "Users can insert own data" ON public.users
                FOR INSERT WITH CHECK (auth.uid()::text = user_id)';
    END IF;
END
$$; 