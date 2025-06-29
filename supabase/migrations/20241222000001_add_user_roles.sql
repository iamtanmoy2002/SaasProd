ALTER TABLE public.users ADD COLUMN IF NOT EXISTS user_type text DEFAULT 'listener';

CREATE INDEX IF NOT EXISTS users_user_type_idx ON public.users(user_type);

alter publication supabase_realtime add table users;
