-- Add user_type column to users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS user_type text;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS users_user_type_idx ON public.users(user_type);

-- Enable realtime for users table
alter publication supabase_realtime add table users;
