import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://oojicesyigyaffnjulzd.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vamljZXN5aWd5YWZmbmp1bHpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMDE2MTAsImV4cCI6MjA2NjU3NzYxMH0.MZpnMUBMthK2VkFaenKPkuOLQCN7xfvAKEJ2k_jJf1U";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
