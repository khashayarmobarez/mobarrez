import React from 'react';

// components
import { IconCloud } from '@/components/magicui/icon-cloud';

// icons
import ReactIcon from '@/assets/iconCloudIcons/react-2.svg'
import NextIcon from '@/assets/iconCloudIcons/next-js.svg'

const AboutSection = () => {
    return (
        <div className='flex flex-col w-full h-[90vh] items-center gap-y-2 snap-section'>
            <div className='w-auto'>
                <IconCloud />
            </div>
        </div>
    );
};

export default AboutSection;