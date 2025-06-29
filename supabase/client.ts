import { createBrowserClient } from "@supabase/ssr";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://oojicesyigyaffnjulzd.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vamljZXN5aWd5YWZmbmp1bHpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMDE2MTAsImV4cCI6MjA2NjU3NzYxMH0.MZpnMUBMthK2VkFaenKPkuOLQCN7xfvAKEJ2k_jJf1U";

export const createClient = () =>
  createBrowserClient(
    SUPABASE_URL!,
    SUPABASE_ANON_KEY!
  );
