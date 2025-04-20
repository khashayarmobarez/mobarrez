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
        <div className='flex w-full h-[100vh] pt-16 items-center justify-between gap-y-2 snap-section'>
            
            <div className="card">
                <div className="tools">
                    <div className="circle">
                        <span className="red box" />
                    </div>
                    <div className="circle">
                        <span className="yellow box" />
                    </div>
                    <div className="circle">
                        <span className="green box" />
                    </div>
                </div>
                <div className="card__content">
                </div>
            </div>

            <div className='w-auto'>
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
                .card {
                    width: 40%;
                    height: 404px;
                    margin: 0 auto;
                    background-color: #011522;
                    border-radius: 8px;
                    z-index: 1;
                }

                .tools {
                    display: flex;
                    align-items: center;
                    padding: 9px;
                }

                .circle {
                    padding: 0 4px;
                }

                .box {
                    display: inline-block;
                    align-items: center;
                    width: 10px;
                    height: 10px;
                    padding: 1px;
                    border-radius: 50%;
                }

                .red {
                    background-color: #ff605c;
                }

                .yellow {
                    background-color: #ffbd44;
                }

                .green {
                    background-color: #00ca4e;
                }
            `}</style>
        </div>
    );
};

export default AboutSection;