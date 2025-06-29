"use client";

import { useState } from "react";
import { createClient } from "../../../supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestConnectionPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const supabase = createClient();
      
      // Test 1: Get current user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        throw new Error(`Auth error: ${authError.message}`);
      }

      if (!user) {
        throw new Error("No user found");
      }

      const testResults: Record<string, any> = {
        user: {
          id: user.id,
          email: user.email,
          created_at: user.created_at
        }
      };

      // Test 2: Check if user exists in users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (userError) {
        testResults.userExists = false;
        testResults.userError = userError.message;
      } else {
        testResults.userExists = true;
        testResults.userData = userData;
      }

      // Test 3: Try to update user role
      const { data: updateData, error: updateError } = await supabase
        .from('users')
        .update({ user_type: 'artist' })
        .eq('user_id', user.id)
        .select();

      if (updateError) {
        testResults.updateError = updateError.message;
        testResults.updateSuccess = false;
        testResults.updateErrorCode = updateError.code;
        testResults.updateErrorDetails = updateError.details;
        testResults.updateErrorHint = updateError.hint;
      } else {
        testResults.updateSuccess = true;
        testResults.updateData = updateData;
      }

      // Test 4: Check current user role after update
      const { data: currentUserData, error: currentUserError } = await supabase
        .from('users')
        .select('user_id, user_type, email')
        .eq('user_id', user.id)
        .single();

      if (currentUserError) {
        testResults.currentUserError = currentUserError.message;
      } else {
        testResults.currentUserData = currentUserData;
      }

      // Test 5: Check RLS policies by trying to read all users (should fail)
      const { data: allUsers, error: allUsersError } = await supabase
        .from('users')
        .select('user_id, user_type')
        .limit(5);

      if (allUsersError) {
        testResults.rlsWorking = true;
        testResults.allUsersError = allUsersError.message;
      } else {
        testResults.rlsWorking = false;
        testResults.allUsers = allUsers;
      }

      // Test 6: Try to update with different approach
      const { data: directUpdate, error: directUpdateError } = await supabase
        .rpc('update_user_role', { 
          user_id_param: user.id, 
          new_role: 'artist' 
        });

      if (directUpdateError) {
        testResults.directUpdateError = directUpdateError.message;
        testResults.directUpdateSuccess = false;
      } else {
        testResults.directUpdateSuccess = true;
        testResults.directUpdate = directUpdate;
      }

      setResult(testResults);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Database Connection Test</h1>
        
        <Button 
          onClick={testConnection} 
          disabled={loading}
          className="mb-8"
        >
          {loading ? "Testing..." : "Test Connection"}
        </Button>

        {error && (
          <Card className="mb-6 border-red-500">
            <CardHeader>
              <CardTitle className="text-red-400">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-red-300 text-sm">{error}</pre>
            </CardContent>
          </Card>
        )}

        {result && (
          <Card className="border-green-500">
            <CardHeader>
              <CardTitle className="text-green-400">Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-green-300 text-sm overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 