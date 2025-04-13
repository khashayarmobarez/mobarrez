"use client"; // Client component due to interactivity

import React, { useState } from "react";
import Link from "next/link";
import Logo from "@/assets/logo/Logo"; // Adjusted path from '@/assets/logo/Logo'
import NavbarSwitch from "@/components/elements/NavbarSwitch"; // Adjusted path from '@/components/elements/NavbarSwitch'

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Toggle drawer
  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  // Navigation links (placeholder routes)
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Navbar */}
      <div className={`navbar bg-background border-disabled  flex justify-between items-center px-4 py-2 fixed top-0 left-0 right-0 z-50 md:static transition-all duration-300
      ${isDrawerOpen ? 'border-none' : 'border-b-[1px] shadow-sm'}`}>
        <Link href="/" >
          <Logo className="w-16 h-12 hover:fill-accent" fill="var(--foreground)" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-x-12 mr-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-foreground text-base hover:text-accent decoration-2 transition-all duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Switch */}
        <div className="flex items-center justify-center md:hidden">
          <NavbarSwitch className="z-[51]" onClick={toggleDrawer} checked={isDrawerOpen} />
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-[101%] bg-background border-l-[1px] border-disabled shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col p-4 pt-24 pl-12 gap-y-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-foreground text-base hover:text-accent transition-colors "
              onClick={toggleDrawer} // Close drawer on link click
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay for Mobile Drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0  bg-opacity-50 z-30 md:hidden"
          onClick={toggleDrawer}
        />
      )}
    </>
  );
};

export default Navbar;