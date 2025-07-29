// src/app/debug-test/page.js
'use client';

import { useState } from 'react';

export default function DebugTestPage() {
  const [debugResult, setDebugResult] = useState(null);
  const [signupResult, setSignupResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runDebugTest = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/debug-auth');
      const data = await response.json();
      setDebugResult(data);
    } catch (error) {
      setDebugResult({ error: error.message });
    }
    setLoading(false);
  };

  const testSignup = async () => {
    setLoading(true);
    try {
      const testData = {
        name: "Debug User",
        email: `debug-${Date.now()}@example.com`,
        password: "debugpass123"
      };

      const response = await fetch('/api/debug-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      });

      const data = await response.json();
      setSignupResult(data);
    } catch (error) {
      setSignupResult({ error: error.message });
    }
    setLoading(false);
  };

  const testActualSignup = async () => {
    setLoading(true);
    try {
      const testData = {
        name: "Real Test User",
        email: `realtest-${Date.now()}@example.com`,
        password: "realtest123"
      };

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      });

      const data = await response.json();
      setSignupResult({ 
        actualSignup: true, 
        ...data,
        status: response.status 
      });
    } catch (error) {
      setSignupResult({ 
        actualSignup: true, 
        error: error.message 
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Authentication Debug Tool</h1>
        
        <div className="space-y-6">
          {/* Debug Tests */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">System Debug</h2>
            <div className="space-x-4">
              <button
                onClick={runDebugTest}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                {loading ? 'Testing...' : 'Run Debug Test'}
              </button>
            </div>
            
            {debugResult && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Debug Results:</h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-auto max-h-96">
                  {JSON.stringify(debugResult, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Signup Tests */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Signup Tests</h2>
            <div className="space-x-4">
              <button
                onClick={testSignup}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                {loading ? 'Testing...' : 'Test Debug Signup'}
              </button>
              <button
                onClick={testActualSignup}
                disabled={loading}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                {loading ? 'Testing...' : 'Test Actual Signup API'}
              </button>
            </div>
            
            {signupResult && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Signup Results:</h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-auto max-h-96">
                  {JSON.stringify(signupResult, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>First, run the "Debug Test" to check your system configuration</li>
              <li>Check for any red flags in environment variables, MongoDB connection, or bcrypt</li>
              <li>Then test the signup functionality with both debug methods</li>
              <li>Compare results to identify where the issue occurs</li>
              <li>Check your Vercel function logs for additional error details</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}