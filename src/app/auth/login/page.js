'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      setError('Invalid email or password. Please try again.');
    } else {
      router.push('/dashboard'); // Redirect to a dashboard or home page
    }
  };

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
                className="mt-1 block w-full rounded-lg border border-gray-600 bg-transparent px-4 py-2 text-foreground focus:border-accent focus:outline-none"
                required
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
                className="mt-1 block w-full rounded-lg border border-gray-600 bg-transparent px-4 py-2 text-foreground focus:border-accent focus:outline-none"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-lg bg-accent px-4 py-2 text-background hover:bg-opacity-80 transition"
            >
              Login
            </button>
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