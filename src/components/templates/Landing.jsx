import React, { Suspense } from 'react';

// assets
import Logo from '@/assets/logo/Logo';

// components
import AtomicLoader from '@/components/elements/AtomicLoader';
import { Meteors } from '../magicui/meteors';
import { MorphingText } from '../magicui/morphing-text';
import ScrollDown from '../elements/ScrollDown';
import AboutSection from '../modules/landing/AboutSection';


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

const Landing = async () => {

    return (
        <div className="flex flex-col items-center justify-start min-h-screen gap-y-2 snap-container">
            {/* hero section */}
            <div className='flex flex-col w-full h-[90vh] items-center gap-y-2 snap-section'>
              <div className="relative overflow-hidden h-[650px] md:h-[550px] w-full max-w-[350px] md:max-w-none -mb-[450px]  ">
                  <Meteors />
              </div>
              <Logo className="w-28 h-20 -mb-4" color='var(--foreground)' />
              <div className='flex flex-col items-center justify-center w-full h-16'>
                  <MorphingText texts={["Mobarrez", "AI automation", "Web-apps", "Applications"]} />
              </div>
              {/* <h1 className=" text-3xl font-extrabold">Mobarrez</h1> */}
              <h2 className=" text-xl font-medium mb-0 -mt-5 md:mt-2">Precision in Progress</h2>
              <p className='text-center text-base text-muted-foreground w-[90%]'>We deliver cutting-edge tech solutions to propel your business forward.</p>
              <button className="btn btn-outline btn-primary w-80 h-10 rounded-2xl text-primary transform hover:scale-105 hover:text-foreground transition-transform duration-300 mt-2">Explore Our Solutions</button>
              <button className="btn btn-primary w-80 h-10 rounded-2xl text-[#f1f1f1] transform hover:scale-105 transition-transform duration-300">Get in touch</button>
              <ScrollDown className={'mt-28'} />
            </div>
            <AboutSection />
            {/* <AtomicLoader /> */}
            {/* <div className='flex flex-col items-center justify-center w-2/3 md:w-2/5'>
                <p className=" text-center mt-2 text-lg">App's Coming</p>
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