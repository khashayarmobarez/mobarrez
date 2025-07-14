'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from "next-auth/react";
import { useEffect } from 'react';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/chat");
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError('Invalid email or password. Please try again.');
      } else if (result?.ok) {
        router.push('/chat'); // Redirect to chat after successful login
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      await signIn("google", { callbackUrl: "/chat" });
    } catch (error) {
      setError('Google login failed. Please try again.');
    }
  };

  const linkedinLogin = async () => {
    try {
      await signIn("linkedin", { callbackUrl: "/chat" });
    } catch (error) {
      setError('LinkedIn login failed. Please try again.');
    }
  };

  // Don't render if user is already authenticated
  if (status === "authenticated") {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="text-center w-full max-w-md flex flex-col items-center">
        <h1 className="text-4xl font-bold text-foreground mb-6 shine">
          Login to Mobarrez
        </h1>
        <div className="w-[75%]">
          {/* Tab Navigation */}
          <div className="flex justify-center space-x-4 mb-6">
            <Link
              href="/auth/login"
              className="px-4 py-2 text-accent border-b-2 border-accent font-medium hover:bg-gray-700 rounded-t-lg"
            >
              Login
            </Link>
            <Link
              href="/auth/signUp"
              className="px-4 py-2 text-muted-foreground hover:text-accent hover:bg-gray-700 rounded-t-lg"
            >
              Sign Up
            </Link>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-gray-600 bg-transparent px-4 py-2 text-foreground focus:border-accent focus:outline-none"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-gray-600 bg-transparent px-4 py-2 text-foreground focus:border-accent focus:outline-none"
                required
                disabled={loading}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-accent px-4 py-2 mt-2 text-background hover:bg-opacity-80 transition disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={googleLogin}
                disabled={loading}
                className="w-1/2 flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium py-2 hover:bg-gray-100 transition disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                  <g>
                    <path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.87-6.87C36.68 2.39 30.77 0 24 0 14.82 0 6.73 5.13 2.69 12.56l8.06 6.26C12.41 13.13 17.74 9.5 24 9.5z"/>
                    <path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.98 37.13 46.1 31.3 46.1 24.55z"/>
                    <path fill="#FBBC05" d="M10.75 28.81A14.5 14.5 0 019.5 24c0-1.68.3-3.3.83-4.81l-8.06-6.26A23.93 23.93 0 000 24c0 3.77.9 7.34 2.5 10.44l8.25-5.63z"/>
                    <path fill="#EA4335" d="M24 48c6.48 0 11.92-2.15 15.89-5.85l-7.19-5.6c-2.01 1.35-4.59 2.15-8.7 2.15-6.26 0-11.59-3.63-13.25-8.81l-8.25 5.63C6.73 42.87 14.82 48 24 48z"/>
                  </g>
                </svg>
                Google
              </button>
              <button
                type="button"
                onClick={linkedinLogin}
                disabled={loading}
                className="w-1/2 flex items-center justify-center gap-2 rounded-xl border border-blue-700 bg-blue-900 text-white font-medium py-2 hover:bg-blue-800 transition disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                  <path fill="currentColor" d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v4.74z"/>
                </svg>
                LinkedIn
              </button>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              <Link href="/forgot-password" className="text-accent hover:underline">
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}