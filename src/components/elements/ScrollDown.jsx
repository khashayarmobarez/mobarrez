'use client'
import React, { useEffect } from 'react';

const ScrollDown = ({ className }) => {
    useEffect(() => {
        document.documentElement.style.scrollBehavior = "smooth";
    }, []);

    return (
        <>
            <div className={` bottom-8 transform ${className} `}>
                <a className="scroll-button w-[30px] h-[50px] rounded-[30px] flex items-center justify-center bg-transparent border-none outline outline-accent shadow-[0_0_10px_var(--accent-color)] relative">
                    <div className="w-[5px] h-[10px] rounded-[10px] bg-accent shadow-[0_0_10px_var(--accent-color)] animate-scroll translate-y-[40%]" />
                </a>
            </div>
            <style jsx>{`
                .scroll-button::after {
                    position: absolute;
                    top: 140%;
                    color: var(--foreground);
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                }

                @keyframes scroll_animation {
                    0% {
                        transform: translateY(40%);
                    }
                    50% {
                        transform: translateY(100%);
                    }
                }

                .animate-scroll {
                    animation: scroll_animation 3s linear infinite;
                }
            `}</style>
        </>
    );
};

export default ScrollDown;