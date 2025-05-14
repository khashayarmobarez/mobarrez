'use client';

// assets
import computerStats from '@/../public/Browser-stats.svg';

import Link from 'next/link';
import { Meteors } from '@/components/magicui/meteors';
import { TypingAnimation } from '@/components/magicui/typing-animation';
import { IconCloud } from '@/components/magicui/icon-cloud';
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
import GoogleBardIcon from '@/components/icons/GoogleBardIcon';
import GoogleCloudIcon from '@/components/icons/GoogleCloudIcon';
import Image from 'next/image';

const About = () => {
    return (
        <div className="flex flex-col w-full h-auto items-center justify-center">
            {/* Hero Section */}
            <section className="relative w-full flex min-h-[105vh] flex-col items-center justify-center bg-gradient-to-b from-background to-[#2a2a2a] overflow-hidden">
                <Meteors number={20} className="z-0" />
                <div className="relative z-10 text-center w-[85%] md:w-full flex flex-col items-center justify-center gap-y-4">
                    <TypingAnimation className="text-5xl font-bold text-foreground mb-4 shine">
                        About Mobarrez
                    </TypingAnimation>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        At Mobarrez, we empower businesses by building intelligent AI agents, seamless AI-driven automation, and custom software solutions—including responsive websites and scalable applications—tailored to your unique needs. As a dedicated consulting team, we provide expert guidance to navigate the digital landscape, ensuring precision, innovation, and measurable growth for your business.
                    </p>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="flex flex-col items-center text-center px-4 md:items-start justify-start pt-14 md:px-16 w-full h-auto pb-14 bg-foreground text-background">
                <h2 className="text-4xl font-bold shine">Our Story</h2>
                <div className="flex flex-col md:flex-row items-center justify-around w-full h-auto md:gap-y-8 md:justify-between md:px-4">

                    <div className="mt-8 max-w-2xl text-lg text-muted-foreground ">
                        <p>
                            Mobarrez was founded in 2023 with a bold mission: to empower businesses through cutting-edge technology, prioritizing precision and quality in every solution we deliver. Starting with our first project—a transformative AI-driven platform—we quickly earned the trust of companies worldwide, growing into a reliable partner known for crafting innovative solutions that seamlessly blend creativity and technical excellence .
                        </p>
                        <p className="mt-4">
                            Our vision is to lead the future of technology by turning visionary ideas into impactful, high-quality realities. We focus on precision in every detail, ensuring businesses can confidently navigate the digital landscape with solutions like AI agents, custom software, and strategic consulting that drive lasting success.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Team Section */}
            <section className="flex flex-col items-center text-center px-4 md:items-start justify-start pt-14 pb-14 md:px-16 w-full h-auto">
                <h2 className="text-4xl font-bold shine">Our Team</h2>
                <div className="flex flex-col md:flex-row items-center justify-around w-full h-auto md:gap-y-8 md:justify-between md:px-4">
                    <p className="text-lg text-muted-foreground max-w-xl md:w-[40%] mt-6">
                        Our team of experienced developers, engineers, designers and innovators is passionate about solving complex challenges. With expertise in web development, AI, and cloud solutions, we’re here to bring your vision to life with precision and creativity.
                    </p>
                    <div className="w-[50%] flex items-center justify-center mt-4">
                        <IconCloud
                        icons={[
                            <NextIcon key="next" className="text-accent" />,
                            <TailwindIcon key="tailwind" className="text-accent" />,
                            <FirebaseIcon key="firebase" className="text-accent" />,
                            <ReactIcon key="react" className="text-accent" />,
                            <MongoDBIcon key="mongodb" className="text-accent" />,
                            <GitIcon key="git" className="text-accent" />,
                            <AnthropicIcon key="anthropic" className="text-accent" />,
                            <OpenAIIcon key="openai" className="text-accent" />,
                            <GitLabIcon key="gitlab" className="text-accent" />,
                            <VercelIcon key="vercel" className="text-accent" />,
                            <GoogleBardIcon key="google-bard" className="text-accent" />,
                            <GoogleCloudIcon key="google-cloud" className="text-accent" />,
                        ]}
                        />
                        <p className="sr-only">
                        Technologies we use: Next.js, Tailwind CSS, Firebase, React, MongoDB, Git, Anthropic, OpenAI, GitLab, Vercel, Google Bard, Google Cloud.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Impact Section */}
            <section className="flex flex-col items-center text-center px-4 md:items-start justify-start pt-16 md:px-16 w-full min-h-[100vh] bg-foreground text-background snap-section">
                <h2 className="text-4xl font-bold shine">Our Impact</h2>
                <div className='w-full flex flex-col md:flex-row md:items-center md:justify-between md:px-4'>
                    <div className="mt-6 max-w-2xl text-lg text-muted-foreground">
                        <p>
                            Since our founding in 2023, Mobarrez has supported businesses worldwide in achieving their tech goals, delivering tailored solutions that foster growth and innovation. From optimizing e-commerce platforms with AI automation to enhancing operational efficiency for startups, our projects have made a tangible difference, establishing us as a dependable partner in the tech industry.
                        </p>
                        <p className="mt-4">
                            From e-commerce platforms to AI-powered automation, our projects have transformed the way businesses operate, making us a trusted partner in the tech industry.
                        </p>
                    </div>
                    <Image src={computerStats} width={100} height={100} alt='stats' className='w-full md:w-1/3'  />
                </div>
            </section>

            {/* CTA Section */}
            <section className="flex flex-col items-center text-center px-4 md:items-start justify-start pt-16 md:px-16 w-full h-[100vh] snap-section">
                <h2 className="text-4xl font-bold shine">Ready to Innovate?</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mt-4">
                Let’s work together to turn your ideas into reality with precision and creativity.
                </p>
                <div className="mt-6 flex justify-center gap-4">
                <Link
                    href="/services"
                    className="rounded-lg bg-accent px-6 py-3 text-background transition hover:bg-opacity-80"
                >
                    Explore Our Services
                </Link>
                <Link
                    href="/contact"
                    className="rounded-lg border border-secondary px-6 py-3 text-secondary transition hover:bg-secondary hover:text-background"
                >
                    Get in Touch
                </Link>
                </div>
            </section>

            <style jsx>{`
                .shine {
                font-size: 2.5rem;
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

export default About;