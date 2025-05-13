'use client';

import { Meteors } from '@/components/magicui/meteors';
import NotFoundSSR from '@/components/modules/NotFoundSSR';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center md:pt-10 md:justify-start bg-background snap-section overflow-hidden">
      {/* Meteors background effect */}
      <Meteors number={20} className="z-0" />

      {/* Main content */}
      <NotFoundSSR />

    </div>
  );
}