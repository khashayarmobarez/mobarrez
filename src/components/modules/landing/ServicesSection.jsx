'use client';
import React, { useEffect, useState } from 'react';

// assets
import consultingData from '@/../public/data-extraction-animate.svg';

// comps
import { TypingAnimation } from '@/components/magicui/typing-animation';
import { AnimatedBeam } from '@/components/magicui/animated-beam';
import AnimatedBeamDemo from './AiAutomationAnimate';
import { Terminal } from '@/components/magicui/terminal';
import { TerminalSection } from '@/components/elements/TerminalSection';
import Image from 'next/image';

const ServicesSection = () => {
    
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);

    useEffect(() => {
        // Calculate vh in pixels
        const vhInPixels = window.innerHeight;
        const thresholds = [2.1, 3.2, 4.4].map((factor) => vhInPixels * factor); // 200vh, 250vh, 270vh

        const handleScroll = () => {
            const scrollPosition = window.scrollY + vhInPixels; // Bottom of viewport position

            if (scrollPosition >= thresholds[0] && !visible) {
                setVisible(true);
            }
            if (scrollPosition >= thresholds[1] && !visible2) {
                setVisible2(true);
            }
            if (scrollPosition >= thresholds[2] && !visible3) {
                setVisible3(true);
            }
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Initial check
        handleScroll();

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [visible, visible2, visible3]); // Include states in dependency array

    return (
        <div id="services-section" className='flex flex-col w-full h-auto items-center justify-center snap-section'>
            <div className='flex flex-col items-center text-center px-4 md:items-start justify-start pt-16 md:px-16 w-full h-[52rem] bg-foreground text-background 
            md:h-[100vh] '>
                {
                visible && (
                    <>
                        <TypingAnimation className="text-4xl font-bold">
                            Ai agents, automation and integration
                        </TypingAnimation>
                    </>
                )}
                <div className='flex flex-col items-start justify-around  w-full h-full  md:gap-y-8
                md:flex-row md:justify-between md:px-4 md:items-center'>
                    <AnimatedBeamDemo />
                    <p className=" text-xl md:w-[35%] font-semibold">
                        We integrate advanced AI and automation to optimize your workflows with precision, delivering personalized solutions that boost efficiency and elevate customer experiences.
                    </p>
                </div>
            </div>
            <div className='flex flex-col items-center text-center px-4 md:items-start justify-start pt-16 md:px-16 w-full h-[52rem] md:h-[100vh]'>
                {
                visible2 && (
                    <>
                        <TypingAnimation className="text-4xl font-bold">
                            Software development
                        </TypingAnimation>
                        <div className='flex flex-col items-start justify-around  w-full h-full  md:gap-y-8
                        md:flex-row md:justify-between md:px-4 md:items-center'>
                            <div className='text-start w-full flex items-center  md:w-[60%] '>
                                <TerminalSection />
                            </div>
                            <p className=" text-xl md:w-[35%] font-semibold -mt-4 md:-mt-0">
                                We build custom, scalable software with cutting-edge tools, ensuring robust solutions tailored to your needs.
                            </p>
                        </div>
                    </>
                )}
            </div>
            <div className='flex flex-col items-center text-center px-4 md:items-start justify-start pt-16 md:pl-16 w-full h-[100vh] bg-foreground text-background'>
                {
                visible3 && (
                    <>
                        <TypingAnimation className="text-4xl font-bold">
                            Startups and consulting
                        </TypingAnimation>
                        <div className='flex flex-col items-start justify-around  w-full h-full  md:gap-y-8
                        md:flex-row md:justify-between md:px-4 md:items-center'>
                            <div className='text-start w-full flex items-center md:w-[40%] '>
                                <Image src={consultingData} width={100} height={100} className='w-full' alt='consulting' />
                            </div>
                            <p className=" text-2xl md:w-[35%] font-semibold">
                            We guide startups with expert consulting and tech strategies, accelerating growth with precision and innovation.
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ServicesSection;