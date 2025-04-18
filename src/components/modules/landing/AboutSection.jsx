'use client';

import React from 'react';

// components
import { IconCloud } from '@/components/magicui/icon-cloud';

// icons
import NextIcon from '@/components/icons/NextIcon';
import TailwindIcon from '@/components/icons/TailwindIcon';
import FirebaseIcon from '@/components/icons/FirebaseIcon';
import ReactIcon from '@/components/icons/ReactIcon';
import MongoDBIcon from '@/components/icons/MongoDBIcon';
import GitIcon from '@/components/icons/GitIcon';
import AnthropicIcon from '@/components/icons/AnthropicIcon';
import OpenAIIcon from '@/components/icons/OpenAIIcon';

const AboutSection = () => {
    return (
        <div className='flex flex-col w-full h-[90vh] items-center gap-y-2 snap-section'>
            <div className='w-auto'>
                <IconCloud icons={[
                    <NextIcon key="next" className="text-foreground" />,
                    <TailwindIcon key="tailwind" className="text-[#06B6D4]" />,
                    <FirebaseIcon key="firebase" />,
                    <ReactIcon key="react" />,
                    <MongoDBIcon key="mongodb" />,
                    <GitIcon key="git" />,
                    <AnthropicIcon key="anthropic" />,
                    <OpenAIIcon key="openai" />
                ]} />
            </div>
        </div>
    );
};

export default AboutSection;