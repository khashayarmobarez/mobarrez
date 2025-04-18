'use client';

import React from 'react';

// components
import { IconCloud } from '@/components/magicui/icon-cloud';

// icons
import NextIcon from '@/components/icons/NextIcon';
import TailwindIcon from '@/components/icons/TailwindIcon';
import FirebaseIcon from '@/components/icons/FirebaseIcon';

const AboutSection = () => {
    return (
        <div className='flex flex-col w-full h-[90vh] items-center gap-y-2 snap-section'>
            <div className='w-auto'>
                <IconCloud icons={[
                    <NextIcon key="next" className="text-foreground" />,
                    <TailwindIcon key="tailwind" className="text-[#06B6D4]" />,
                    <FirebaseIcon key="firebase" />
                ]} />
            </div>
        </div>
    );
};

export default AboutSection;