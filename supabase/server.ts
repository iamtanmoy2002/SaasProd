import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://oojicesyigyaffnjulzd.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vamljZXN5aWd5YWZmbmp1bHpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMDE2MTAsImV4cCI6MjA2NjU3NzYxMH0.MZpnMUBMthK2VkFaenKPkuOLQCN7xfvAKEJ2k_jJf1U";

export const createClient = async () => {
  console.log('Creating Supabase server client with URL:', SUPABASE_URL);
  
  try {
    const cookieStore = cookies();

    const client = createServerClient(
      SUPABASE_URL!,
      SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            try {
              const allCookies = cookieStore.getAll().map(({ name, value }) => ({
                name,
                value,
              }));
              console.log('Supabase client: Retrieved cookies:', allCookies.length);
              return allCookies;
            } catch (error) {
              console.error("Supabase client: Error accessing cookies:", error);
              return [];
            }
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options);
              });
              console.log('Supabase client: Set cookies:', cookiesToSet.length);
            } catch (error) {
              console.error("Supabase client: Error setting cookies:", error);
            }
          },
        },
      }
    );

    console.log('Supabase server client created successfully');
    return client;
  } catch (error) {
    console.error('Supabase client: Error creating client:', error);
    throw error;
  }
};
