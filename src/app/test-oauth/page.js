// Create this file: src/app/test-oauth/page.js
'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function TestOAuthPage() {
  const { data: session, status } = useSession();
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testCurrentSession = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-oauth');
      const data = await response.json();
      setTestResult(data);
    } catch (error) {
      setTestResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { 
      callbackUrl: '/test-oauth',
      redirect: true 
    });
  };

  useEffect(() => {
    if (status === 'authenticated') {
      testCurrentSession();
    }
  }, [status]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">OAuth Testing Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Session Status */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Current Session</h2>
            <div className="space-y-2">
              <p><strong>Status:</strong> {status}</p>
              {session ? (
                <>
                  <p><strong>User ID:</strong> {session.user?.id || 'No ID'}</p>
                  <p><strong>Email:</strong> {session.user?.email}</p>
                  <p><strong>Name:</strong> {session.user?.name}</p>
                  <p><strong>Expires:</strong> {session.expires}</p>
                </>
              ) : (
                <p>No session</p>
              )}
            </div>
            
            <div className="mt-4 space-x-4">
              {session ? (
                <button 
                  onClick={() => signOut({ callbackUrl: '/test-oauth' })}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                >
                  Sign Out
                </button>
              ) : (
                <button 
                  onClick={handleGoogleSignIn}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                >
                  Sign In with Google
                </button>
              )}
              
              <button 
                onClick={testCurrentSession}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded disabled:opacity-50"
              >
                {loading ? 'Testing...' : 'Test Session'}
              </button>
            </div>
          </div>

          {/* Test Results */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Test Results</h2>
            {testResult ? (
              <pre className="text-sm overflow-auto max-h-96 bg-gray-900 p-4 rounded">
                {JSON.stringify(testResult, null, 2)}
              </pre>
            ) : (
              <p className="text-gray-400">Click "Test Session" to see results</p>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Testing Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>If you're not signed in, click "Sign In with Google"</li>
            <li>If sign-in fails, check the browser console for errors</li>
            <li>If you get the OAuthAccountNotLinked error, check the server logs</li>
            <li>Use the "Test Session" button to verify the session is working</li>
            <li>Check that the User ID is present in the session</li>
          </ol>
        </div>

        {/* Debug Links */}
        <div className="mt-4 space-x-4">
          <a 
            href="/api/debug-oauth?email=khashayarmobarezbusiness@gmail.com" 
            target="_blank"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Check Database State
          </a>
          <a 
            href="/api/auth/signin" 
            target="_blank"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            NextAuth Sign-In Page
          </a>
        </div>
      </div>
    </div>
  );
}