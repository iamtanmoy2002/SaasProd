"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DebugRolePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const debugUser = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/debug-user');
      const data = await response.json();
      
      console.log('Debug result:', data);
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testRoleUpdate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/update-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: 'listener' }),
      });

      const data = await response.json();
      
      console.log('Role update test result:', data);
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Role Update Debug</h1>
        
        <div className="flex gap-4 mb-8">
          <Button 
            onClick={debugUser} 
            disabled={loading}
          >
            {loading ? "Debugging..." : "Debug User"}
          </Button>
          
          <Button 
            onClick={testRoleUpdate} 
            disabled={loading}
            variant="outline"
          >
            {loading ? "Testing..." : "Test Role Update"}
          </Button>
        </div>

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
              <CardTitle className="text-green-400">Debug Results</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-green-300 text-sm overflow-auto max-h-96">
                {JSON.stringify(result, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 