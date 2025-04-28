'use client';

import React, { useEffect, useState } from 'react';
import { TypingAnimation } from '@/components/magicui/typing-animation';

const ServicesSection = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Calculate 200vh in pixels
        const vhInPixels = window.innerHeight * 2; // 200vh = 2 * 100vh

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                root: null,
                rootMargin: `${vhInPixels}px 0px 0px 0px`, // Convert 200vh to pixels
                threshold: 0.1
            }
        );

        const element = document.getElementById('services-section');
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, []);

    return (
        <div id="services-section" className='flex flex-col w-full h-auto items-center justify-center snap-section'>
            <div className='flex flex-col items-center text-center px-4 md:items-start justify-start pt-16 md:pl-16 md:pr-0 w-full h-[100vh] bg-foreground text-background'>
                {
                isVisible && (
                    <TypingAnimation className="text-4xl font-bold">
                        Ai agents, automation and integration
                    </TypingAnimation>
                )}
                
            </div>
            <div className='flex flex-col items-center text-center px-4 md:items-start justify-start pt-16 md:pl-16 h-[100vh] '>
                {
                isVisible && (
                    <TypingAnimation className="text-4xl font-bold">
                        Software development
                    </TypingAnimation>
                )}
            </div>
            <div className='flex flex-col items-center text-center px-4 md:items-start justify-start pt-16 md:pl-16 w-full h-[100vh] bg-foreground text-background'>
                {
                isVisible && (
                    <TypingAnimation className="text-4xl font-bold">
                        Startups and consulting
                    </TypingAnimation>
                )}
            </div>
        </div>
    );
};

export default ServicesSection;