import Logo from '@/assets/logo/Logo';
import AtomicLoader from '@/components/elements/AtomicLoader';
import React, { Suspense } from 'react';
import { Meteors } from '../magicui/meteors';
import { MorphingText } from '../magicui/morphing-text';

async function SlowComponent() {
    // Artificial 3-second delay to simulate loading
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return (
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold tracking-tighter md:text-7xl">
          Mobarrez
        </h1>
        <p className="mt-2 text-lg text-disabled md:text-xl">
          Precision in Progress
        </p>
      </div>
    );
  }

const Landing = () => {

    return (
        <div className="flex flex-col items-center justify-start min-h-screen gap-y-2">
            <div className="relative overflow-hidden h-[650px] md:h-[550px] w-full max-w-[350px] md:max-w-none -mb-[450px]  ">
                <Meteors />
            </div>
            <Logo className="w-28 h-20 -mb-4" color='var(--foreground)' />
            <div className='flex flex-col items-center justify-center w-full h-16'>
                <MorphingText texts={["Mobarrez", "AI automation", "Web-apps", "Applications"]} />
            </div>
            {/* <h1 className=" text-3xl font-extrabold">Mobarrez</h1> */}
            <h2 className=" text-lg font-medium mb-0 -mt-5 md:mt-2">Precision in Progress</h2>
            {/* <AtomicLoader /> */}
            {/* <div className='flex flex-col items-center justify-center w-2/3 md:w-2/5'>
                <p className=" text-center mt-2 text-lg">App’s Coming</p>
                <p className=" text-center text-base"><span className='text-accent'>Precision</span> Takes Time</p>
            </div>
            <div className='flex flex-col items-center justify-center w-2/3 md:w-2/5'>
                <p className=" text-center mt-2 text-lg">contact us for more information</p>
                <a
                href="mailto:mobarrez.co@gmail.com" 
                className=" text-center text-base text-accent hover:underline"
                >
                    mobarrez.co@gmail.com
                </a>
            </div> */}
        </div>
    );

};

export default Landing;