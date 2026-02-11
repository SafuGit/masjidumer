/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const NAV_LINKS = [
  { name: "Home", href: "#" },
  { name: "About Us", href: "#about" },
  { name: "Prayer Times", href: "#prayer-times" },
  { name: "Events", href: "#events" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-emerald-950/90 backdrop-blur-md border-b border-emerald-100 dark:border-emerald-900">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href={"/"}>
            <img src="/full-logo.png" width={225} alt="Logo" />
          </Link>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center space-x-8 font-medium text-sm">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-primary dark:hover:text-emerald-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Buttons & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <button className="px-6 py-2.5 bg-primary hover:bg-secondary text-white rounded-full font-semibold text-sm transition-all shadow-md shadow-emerald-900/20 active:scale-95    duration-300 ease-in-out hover:shadow-lg hover:shadow-emerald-900/40 cursor-pointer">
            Donate
          </button>

          {/* Mobile Menu Button */}
          <button
            className="p-2 lg:hidden text-primary dark:text-emerald-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-emerald-950/95 backdrop-blur-md border-t border-emerald-100 dark:border-emerald-900 transition-all">
          <div className="flex flex-col px-6 py-4 space-y-4 font-medium text-base">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-primary dark:hover:text-emerald-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
