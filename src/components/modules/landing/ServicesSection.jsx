import React from 'react';

const ServicesSection = () => {
    return (
        <div className='flex flex-col items-center w-full h-[100vh]'>
            <div className='flex flex-col items-center justify-center w-full h-40 bg-accent'>
                <h1 className='text-4xl font-bold'>Ai agents, automation and integration</h1>
            </div>
            <div className='flex flex-col items-center justify-center w-full h-40 '>
                <h1 className='text-4xl font-bold'>Software development</h1>
            </div>
            <div className='flex flex-col items-center justify-center w-full h-40 bg-accent'>
                <h1 className='text-4xl font-bold'>Startups and consulting</h1>
            </div>
        </div>
    );
};

export default ServicesSection;