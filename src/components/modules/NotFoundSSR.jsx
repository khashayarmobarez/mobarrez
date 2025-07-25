import Link from 'next/link';
import React from 'react';

// assets
import NotFoundPicture from '@/../public/404-error-lost-in-space-animate.svg';
import Image from 'next/image';

const NotFoundSSR = () => {
    return (
        <div className="relative z-10 text-center w-3/4 flex flex-col items-center h-full gap-y-4">
            <Image src={NotFoundPicture} alt='not found' width={100} height={100} className='w-full md:w-1/3'  />
            <p className="text-lg text-muted-foreground mb-6">
                It looks like the page you’re looking for doesn’t exist.
            </p>
            <Link
            href="/"
            className="inline-block rounded-2xl bg-none border border-accent px-6 py-3 text-accent transition hover:scale-105"
            >
            Return to Homepage
            </Link>
        </div>
    );
};

export default NotFoundSSR;