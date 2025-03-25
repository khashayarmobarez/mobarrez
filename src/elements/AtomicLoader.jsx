'use client'
import React from 'react';

const AtomicLoader = () => {
    return (
        <>
            <div className='min-h-44 flex items-center justify-center '>
                <div className="loader">
                    <div className="loader-orbits">
                        <div className="loader-orbits__electron"></div>
                        <div className="loader-orbits__electron"></div>
                        <div className="loader-orbits__electron"></div>
                    </div>
                </div>
            </div>
            {/* Styled JSX */}
            <style jsx>{`
                .loader {
                --float: 5%;
                --radius: 2rem;

                background: #f33;
                border-radius: var(--radius);
                height: var(--radius);
                position: relative;
                width: var(--radius);
                animation-name: floatAtom;
                animation-duration: 2s;
                animation-iteration-count: infinite;
                animation-timing-function: linear;
                }

                .loader::after {
                --light-x: 30%;
                --light-y: 25%;
                --light-radius: 3%;

                background: radial-gradient(
                    circle at var(--light-x) var(--light-y),
                    rgba(255, 255, 255, 1),
                    transparent calc(1 * var(--light-radius))
                    ),
                    radial-gradient(
                    circle at var(--light-x) var(--light-y),
                    rgba(255, 255, 255, 0.8),
                    transparent calc(2 * var(--light-radius))
                    ),
                    radial-gradient(
                    circle at var(--light-x) var(--light-y),
                    rgba(255, 255, 255, 0.6),
                    transparent calc(3 * var(--light-radius))
                    ),
                    radial-gradient(
                    circle at var(--light-x) var(--light-y),
                    rgba(255, 255, 255, 0.4),
                    transparent calc(4 * var(--light-radius))
                    ),
                    radial-gradient(
                    circle at var(--light-x) var(--light-y),
                    rgba(255, 255, 255, 0.2),
                    transparent calc(5 * var(--light-radius))
                    );
                border-radius: inherit;
                content: "";
                height: 100%;
                left: 0;
                position: absolute;
                top: 0;
                width: 100%;
                }

                .loader-orbits {
                --color-line: #fff;
                --color-glow: #0ff;
                --electron-nb: 3;
                --radius: 500%;

                border-radius: var(--radius);
                filter: drop-shadow(0 0 0.3rem var(--color-glow));
                height: var(--radius);
                left: calc(50% - var(--radius) / 2);
                position: absolute;
                top: calc(50% - var(--radius) / 2);
                width: var(--radius);
                }

                .loader-orbits__electron {
                --clip-radius: 20%;
                --radius: 100%;
                --ratio: 4;

                border-radius: var(--radius);
                height: calc(var(--radius) / var(--ratio));
                left: calc(50% - var(--radius) / 2);
                position: absolute;
                top: calc(50% - var(--radius) / (var(--ratio) * 2));
                transform: rotateZ(calc(var(--index) * 180deg / var(--electron-nb)));
                width: var(--radius);
                z-index: 100;
                animation-name: orbitElectron;
                animation-delay: calc((var(--index) + 1) * 0.5s / var(--electron-nb));
                animation-duration: 0.5s;
                animation-iteration-count: infinite;
                animation-timing-function: linear;
                }

                .loader-orbits__electron::before,
                .loader-orbits__electron::after {
                border-radius: inherit;
                box-shadow: inset 0 var(--offset-direction) 0 0.02rem var(--color-line);
                content: "";
                height: 100%;
                left: 0;
                position: absolute;
                top: 0;
                width: 100%;
                }

                .loader-orbits__electron::before {
                --offset-direction: 0.1rem;
                }

                .loader-orbits__electron::after {
                --offset-direction: -0.1rem;
                }

                .loader-orbits__electron:nth-child(1) {
                --index: 0;
                }

                .loader-orbits__electron:nth-child(2) {
                --index: 1;
                }

                .loader-orbits__electron:nth-child(3) {
                --index: 2;
                }

                @keyframes floatAtom {
                0% {
                    transform: translateY(calc(-1 * var(--float)));
                }
                25% {
                    transform: translateY(calc(-2 * var(--float)));
                }
                50% {
                    transform: translateY(calc(-1 * var(--float)));
                }
                75% {
                    transform: translateY(calc(0 * var(--float)));
                }
                100% {
                    transform: translateY(calc(-1 * var(--float)));
                }
                }

                @keyframes orbitElectron {
                0% {
                    clip-path: ellipse(
                    calc(2 * var(--clip-radius)) var(--clip-radius) at 50% 0
                    );
                }
                25% {
                    clip-path: ellipse(
                    calc(2 * var(--clip-radius)) var(--clip-radius) at 0 50%
                    );
                }
                50% {
                    clip-path: ellipse(
                    calc(2 * var(--clip-radius)) var(--clip-radius) at 50% 100%
                    );
                }
                75% {
                    clip-path: ellipse(
                    calc(2 * var(--clip-radius)) var(--clip-radius) at 100% 50%
                    );
                }
                100% {
                    clip-path: ellipse(
                    calc(2 * var(--clip-radius)) var(--clip-radius) at 50% 0
                    );
                }
                }
            `}
            </style>
        </>
    );
};

export default AtomicLoader;