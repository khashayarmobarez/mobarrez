'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const email = searchParams.get('email');

  const getErrorMessage = (error) => {
    switch (error) {
      case 'OAuthAccountNotLinked':
        return {
          title: 'Account Already Exists',
          message: `An account with ${email ? `the email ${email}` : 'this email'} already exists. Please sign in with your original method.`,
          suggestion: 'Try signing in with your email and password, or use the same OAuth provider you used before.'
        };
      case 'AccountExists':
        return {
          title: 'Account Already Exists',
          message: `An account with the email ${email} already exists.`,
          suggestion: 'Please sign in using your existing method (email/password or the OAuth provider you used before).'
        };
      case 'CredentialsSignin':
        return {
          title: 'Invalid Credentials',
          message: 'The email or password you entered is incorrect.',
          suggestion: 'Please check your credentials and try again.'
        };
      case 'OAuthSignin':
      case 'OAuthCallback':
        return {
          title: 'OAuth Provider Error',
          message: 'There was an error with the OAuth provider.',
          suggestion: 'Please try again or use a different sign-in method.'
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
    <div className="flex min-h-screen max-w-[90vw] flex-col items-center justify-center bg-background text-foreground">
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
          {(error === 'OAuthAccountNotLinked' || error === 'AccountExists') && (
            <>
              <div className="text-sm text-muted-foreground">
                Or try signing in with:
              </div>
              <div className="flex gap-2">
                <Link
                  href="/auth/login"
                  className="flex-1 rounded-lg border border-accent px-3 py-2 text-accent hover:bg-accent hover:text-background transition text-sm"
                >
                  Email & Password
                </Link>
                <Link
                  href="/auth/signUp"
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-300 hover:bg-gray-300 hover:text-background transition text-sm"
                >
                  Different Email
                </Link>
              </div>
            </>
          )}
        </div>
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-4 bg-gray-800 rounded text-xs text-left">
            <strong>Debug Info:</strong><br />
            Error: {error || 'No error specified'}<br />
            Email: {email || 'No email provided'}
          </div>
        )}
      </div>
    </div>
  );
}