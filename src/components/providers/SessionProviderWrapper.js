'use client';

import { SessionProvider } from 'next-auth/react';

export default function SessionProviderWrapper({ children }) {
  return (
    <SessionProvider 
      // Refetch session every 5 minutes
      refetchInterval={5 * 60}
      // Refetch session when window is focused
      refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  );
}