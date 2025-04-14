import Logo from '@/assets/logo/Logo';
import AtomicLoader from '@/components/elements/AtomicLoader';
import React from 'react';
import { Meteors } from '../magicui/meteors';

const Landing = () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-y-2">
            <div className="relative overflow-hidden h-[500px] w-full max-w-[350px] md:max-w-none -mb-[450px] -mt-[150px] ">
                <Meteors />
            </div>
            <Logo className="w-28 h-20 -mb-4" color='var(--foreground)' />
            <h1 className=" text-3xl font-extrabold">Mobarrez</h1>
            <h className=" text-lg font-medium mb-0">Precision in Progress</h>
            <AtomicLoader />
            <div className='flex flex-col items-center justify-center w-2/3 md:w-2/5'>
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
            </div>
        </div>
    );

};

export default Landing;