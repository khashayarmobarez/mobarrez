'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error) => {
    switch (error) {
      case 'OAuthAccountNotLinked':
        return {
          title: 'Account Already Exists',
          message: 'An account with this email already exists. Please sign in with your original method or contact support.',
          suggestion: 'Try signing in with your email and password instead.'
        };
      case 'CredentialsSignin':
        return {
          title: 'Invalid Credentials',
          message: 'The email or password you entered is incorrect.',
          suggestion: 'Please check your credentials and try again.'
        };
      default:
        return {
          title: 'Authentication Error',
          message: 'An error occurred during authentication.',
          suggestion: 'Please try again or contact support if the problem persists.'
        };
    }
  };

  const errorInfo = getErrorMessage(error);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="text-center w-full max-w-md">
        <h1 className="text-2xl font-bold text-red-500 mb-4">
          {errorInfo.title}
        </h1>
        <p className="text-muted-foreground mb-4">
          {errorInfo.message}
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          {errorInfo.suggestion}
        </p>
        <div className="space-y-3">
          <Link
            href="/auth/login"
            className="block w-full rounded-lg bg-accent px-4 py-2 text-background hover:bg-opacity-80 transition"
          >
            Back to Login
          </Link>
          {error === 'OAuthAccountNotLinked' && (
            <Link
              href="/auth/signUp"
              className="block w-full rounded-lg border border-accent px-4 py-2 text-accent hover:bg-accent hover:text-background transition"
            >
              Create New Account
            </Link>
          )}
        </div>
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-4 bg-gray-800 rounded text-xs text-left">
            <strong>Debug Info:</strong><br />
            Error: {error || 'No error specified'}
          </div>
        )}
      </div>
    </div>
  );
}