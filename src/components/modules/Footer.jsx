import Logo from '@/assets/logo/Logo';
import React from 'react';

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
            <aside>
                <Logo className="w-16 h-12 hover:fill-accent" fill="var(--foreground)" />
                <p>
                Mobarrez Industries.
                <br />
                Providing reliable tech solutions since 2023
                </p>
            </aside>
            <nav>
                <h6 className="footer-title">Services</h6>
                <a className="link link-hover">Ai agent</a>
                <a className="link link-hover">Ai automation</a>
                <a className="link link-hover">website and software</a>
                <a className="link link-hover">consulting</a>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                {/* <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a> */}
            </nav>
            {/* <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav> */}
        </footer>
    );
};

export default Footer;