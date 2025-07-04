'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Placeholder for signup logic (e.g., NextAuth.js or custom API)
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Signup failed');
      router.push('/login'); // Redirect to login after successful signup
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    }
  };

return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
        <div className="text-center w-full max-w-md flex flex-col items-center">
            <h1 className="text-4xl font-bold text-foreground mb-6 shine">
                Register to mobarrez
            </h1>
            <div className="w-[75%]">
                {/* Tab Navigation */}
                <div className="flex justify-center space-x-4 mb-6">
                    <Link
                        href="/auth/login"
                        className="px-4 py-2 text-muted-foreground hover:text-accent hover:bg-gray-700 rounded-t-lg"
                    >
                        Login
                    </Link>
                    <Link
                        href="/auth/signUp"
                        className="px-4 py-2 text-accent border-b-2 border-accent font-medium hover:bg-gray-700 rounded-t-lg"
                    >
                        Sign Up
                    </Link>
                </div>
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full rounded-lg border border-gray-600 bg-transparent px-4 py-2 text-foreground focus:border-accent focus:outline-none"
                            required
                        />
                    </div>
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
              Sign Up
            </button>
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                className="w-1/2 flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium py-2 hover:bg-gray-100 transition"
              >
                {/* Google SVG Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.87-6.87C36.68 2.39 30.77 0 24 0 14.82 0 6.73 5.13 2.69 12.56l8.06 6.26C12.41 13.13 17.74 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.98 37.13 46.1 31.3 46.1 24.55z"/><path fill="#FBBC05" d="M10.75 28.81A14.5 14.5 0 019.5 24c0-1.68.3-3.3.83-4.81l-8.06-6.26A23.93 23.93 0 000 24c0 3.77.9 7.34 2.5 10.44l8.25-5.63z"/><path fill="#EA4335" d="M24 48c6.48 0 11.92-2.15 15.89-5.85l-7.19-5.6c-2.01 1.35-4.59 2.15-8.7 2.15-6.26 0-11.59-3.63-13.25-8.81l-8.25 5.63C6.73 42.87 14.82 48 24 48z"/></g></svg>
                Google
              </button>
              <button
                type="button"
                className="w-1/2 flex items-center justify-center gap-2 rounded-xl border border-gray-700 bg-gray-900 text-white font-medium py-2 hover:bg-gray-800 transition"
              >
                {/* GitHub SVG Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5"><path fill="currentColor" d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .268.18.579.688.481C21.138 20.2 24 16.447 24 12.021 24 6.484 19.523 2 12 2z"/></svg>
                GitHub
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}