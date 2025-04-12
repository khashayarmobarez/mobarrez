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
      <div className="navbar bg-background border-b-[1px] border-disabled shadow-sm flex justify-between items-center px-4 py-2">
        <Link href="/">
          <Logo className="w-16 h-12" fill="var(--foreground)" />
        </Link>

        <div className="flex items-center justify-center">
          <NavbarSwitch className=" z-50" onClick={toggleDrawer} checked={isDrawerOpen} />
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full backdrop-blur-3xl border-l-[1px] border-disabled shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
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
          className="fixed inset-0  bg-opacity-50 z-30 lg:hidden"
          onClick={toggleDrawer}
        />
      )}
    </>
  );
};

export default Navbar;