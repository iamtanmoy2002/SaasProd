-- Remove default value from user_type column
ALTER TABLE public.users ALTER COLUMN user_type DROP DEFAULT;
