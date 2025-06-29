"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../supabase/client";

export default function AuthDebug() {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          setError(sessionError.message);
        } else {
          setSession(session);
          setUser(session?.user ?? null);
        }

        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          setError(userError.message);
        } else {
          setUser(user);
        }
      } catch (err) {
        setError('Failed to check authentication');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  if (loading) {
    return <div className="p-4 bg-blue-100 text-blue-800 rounded">Loading auth status...</div>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded text-sm">
      <h3 className="font-bold mb-2">Auth Debug Info:</h3>
      {error && (
        <div className="mb-2 p-2 bg-red-100 text-red-800 rounded">
          Error: {error}
        </div>
      )}
      
      <div className="mb-2">
        <strong>Session Status:</strong> {session ? 'Active' : 'Missing'}
      </div>
      
      {user ? (
        <div>
          <p><strong>User ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Email Confirmed:</strong> {user.email_confirmed_at ? 'Yes' : 'No'}</p>
          <p><strong>Created:</strong> {new Date(user.created_at).toLocaleString()}</p>
          <p><strong>Last Sign In:</strong> {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Never'}</p>
        </div>
      ) : (
        <p className="text-gray-600">No user logged in</p>
      )}
      
      {session && (
        <div className="mt-2 p-2 bg-green-100 text-green-800 rounded">
          <strong>Session Active:</strong> {session.access_token ? 'Yes' : 'No'}
        </div>
      )}
    </div>
  );
} 