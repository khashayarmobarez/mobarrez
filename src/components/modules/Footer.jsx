import Logo from '@/assets/logo/Logo';
import Link from 'next/link';
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
                <Link className="link link-hover" href="/services">Ai agent</Link>
                <Link className="link link-hover" href="/services">Ai automation</Link>
                <Link className="link link-hover" href="/services">website and software</Link>
                <Link className="link link-hover" href="/services">consulting</Link>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <Link className="link link-hover" href="/about">About us</Link>
                <Link className="link link-hover" href="/contact">Contact</Link>
                {/* <Link className="link link-hover" href="#">Jobs</Link>
                <Link className="link link-hover" href="#">Press kit</Link> */}
            </nav>
            {/* <nav>
                <h6 className="footer-title">Legal</h6>
                <Link className="link link-hover" href="#">Terms of use</Link>
                <Link className="link link-hover" href="#">Privacy policy</Link>
                <Link className="link link-hover" href="#">Cookie policy</Link>
            </nav> */}
        </footer>
    );
};

export default Footer;