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
import GitLabIcon from '@/components/icons/GitLabIcon';
import VercelIcon from '@/components/icons/VercelIcon';
import AnthropicDarkIcon from '@/components/icons/AnthropicDarkIcon';
import GoogleBardIcon from '@/components/icons/GoogleBardIcon';
import GoogleCloudIcon from '@/components/icons/GoogleCloudIcon';

const AboutSection = () => {
    return (
        <div className='flex flex-col w-full h-[100vh] pt-16 items-center justify-around gap-y-2 md:flex-row md:h-[95vh]'>
            
            <div className='flex flex-col items-center justify-center w-full md:w-[50%]'>
                <div className="shine text-center ">Your Partner in Tech Excellence</div>
                <p className='text-muted-foreground text-center md:w-[60%] w-[80%] mt-2 font-semibold opacity-70'>
                At Mobarrez, we don’t just build software — we forge elite, culture-driven engineers and AI specialists the world actually wants to hire.
                Through relentless practical training, real client projects, and a no-BS professional culture, we transform ambitious learners into independent thinkers who ship production-grade code, master modern tools (Next.js, AI agents, system design), and deliver measurable results.
                The best rise to the top and join the Mobarrez Pro Team or get placed with top companies.
                Precision in Progress isn’t a slogan. It’s the standard we live by and the promise we keep.
                </p>
            </div>

            <div className='w-[50%] flex items-center justify-center -mt-4'>
                <IconCloud icons={[
                    <NextIcon key="next" className="text-foreground" />,
                    <TailwindIcon key="tailwind" className="text-[#06B6D4]" />,
                    <FirebaseIcon key="firebase" />,
                    <ReactIcon key="react" />,
                    <ReactIcon key="react" />,
                    <MongoDBIcon key="mongodb" />,
                    <MongoDBIcon key="mongodb" />,
                    <GitIcon key="git" />,
                    <GitIcon key="git" />,
                    <AnthropicIcon key="anthropic" />,
                    <AnthropicIcon key="anthropic" />,
                    <OpenAIIcon key="openai" />,
                    <OpenAIIcon key="openai" />,
                    <GitLabIcon key="gitlab" />,
                    <GitLabIcon key="gitlab" />,
                    <VercelIcon key="vercel" className="dark:fill-white" />,
                    <VercelIcon key="vercel" className="dark:fill-white" />,
                    <AnthropicDarkIcon key="anthropic-dark" className="dark:block hidden" />,
                    <GoogleBardIcon key="google-bard" />,
                    <GoogleBardIcon key="google-bard" />,
                    <GoogleCloudIcon key="google-cloud" />,
                    <GoogleCloudIcon key="google-cloud" />
                ]}/>
            </div>

            <style jsx>{`
                .shine {
                    font-size: 1.8rem;
                    font-weight: 800;
                    color: rgba(255, 255, 255, 0.3);
                    background: #222 -webkit-gradient(
                        linear,
                        left top,
                        right top,
                        from(#222),
                        to(#222),
                        color-stop(0.5, #fff)
                    ) 0 0 no-repeat;
                    background-image: -webkit-linear-gradient(
                    -40deg,
                    transparent 0%,
                    transparent 40%,
                    #fff 50%,
                    transparent 60%,
                    transparent 100%
                    );
                    -webkit-background-clip: text;
                    -webkit-background-size: 50px;
                    -webkit-animation: zezzz;
                    -webkit-animation-duration: 5s;
                    -webkit-animation-iteration-count: infinite;
                }
                @-webkit-keyframes zezzz {
                    0%,
                    10% {
                        background-position: -400px;
                    }
                    20% {
                        background-position: top left;
                    }
                    100% {
                        background-position: 400px;
                    }
                }
            `}</style>
        </div>
    );
};

export default AboutSection;