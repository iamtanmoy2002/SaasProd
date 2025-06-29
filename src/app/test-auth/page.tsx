import { createClient } from '../../../supabase/server';
import { redirect } from 'next/navigation';

export default async function TestAuthPage() {
  const supabase = await createClient();

  // Get current session
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  // Check user data in database
  let userData = null;
  let userDataError = null;
  
  if (user) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();
    
    userData = data;
    userDataError = error;
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Authentication Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Session Status */}
          <div className="bg-zinc-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Session Status</h2>
            <div className="space-y-2">
              <p><strong>Session Active:</strong> {session ? 'Yes' : 'No'}</p>
              <p><strong>Session Error:</strong> {sessionError?.message || 'None'}</p>
              {session && (
                <div className="text-sm text-gray-400">
                  <p>Access Token: {session.access_token ? 'Present' : 'Missing'}</p>
                  <p>Refresh Token: {session.refresh_token ? 'Present' : 'Missing'}</p>
                </div>
              )}
            </div>
          </div>

          {/* User Status */}
          <div className="bg-zinc-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">User Status</h2>
            <div className="space-y-2">
              <p><strong>User Authenticated:</strong> {user ? 'Yes' : 'No'}</p>
              <p><strong>User Error:</strong> {userError?.message || 'None'}</p>
              {user && (
                <div className="text-sm text-gray-400">
                  <p>ID: {user.id}</p>
                  <p>Email: {user.email}</p>
                  <p>Email Confirmed: {user.email_confirmed_at ? 'Yes' : 'No'}</p>
                </div>
              )}
            </div>
          </div>

          {/* Database User Data */}
          <div className="bg-zinc-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Database User Data</h2>
            <div className="space-y-2">
              <p><strong>User Data Found:</strong> {userData ? 'Yes' : 'No'}</p>
              <p><strong>Database Error:</strong> {userDataError?.message || 'None'}</p>
              {userData && (
                <div className="text-sm text-gray-400">
                  <p>User Type: {userData.user_type || 'Not set'}</p>
                  <p>Full Name: {userData.full_name || 'Not set'}</p>
                  <p>Created: {new Date(userData.created_at).toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-zinc-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Actions</h2>
            <div className="space-y-2">
              <a 
                href="/sign-in" 
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-2 px-4 rounded transition-colors"
              >
                Go to Sign In
              </a>
              <a 
                href="/sign-up" 
                className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded transition-colors"
              >
                Go to Sign Up
              </a>
              {user && !userData?.user_type && (
                <a 
                  href="/role-selector" 
                  className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-2 px-4 rounded transition-colors"
                >
                  Go to Role Selector
                </a>
              )}
              {user && userData?.user_type && (
                <a 
                  href="/dashboard" 
                  className="block w-full bg-purple-500 hover:bg-purple-600 text-white text-center py-2 px-4 rounded transition-colors"
                >
                  Go to Dashboard
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 