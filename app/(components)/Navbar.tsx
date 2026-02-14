/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import Link from "next/link";
import { GoogleSignInButton } from "@firebase-oss/ui-react";
import { useAuth } from "@/app/(lib)/auth-context";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/app/(lib)/firebase.init";
import { signOut } from "firebase/auth";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Prayer Times", href: "#prayer-times" },
  { name: "Events", href: "#events" },
  { name: "Donate", href: "#donate" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isSuperAdmin, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (pathname == "/admin") return <></>

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
          {!loading && (
            <>
              {!user ? (
                <div className="hidden sm:block">
                  <GoogleSignInButton themed={true}/>
                </div>
              ) : isSuperAdmin ? (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => router.push('/admin')}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold text-sm transition-all shadow-md shadow-emerald-900/20 active:scale-95 duration-300 ease-in-out hover:shadow-lg hover:shadow-emerald-900/40 cursor-pointer"
                  >
                    Go to Admin Panel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="p-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all shadow-md active:scale-95 duration-300 ease-in-out hover:shadow-lg"
                    title="Log Out"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-100 rounded-full text-sm font-medium">
                    {user.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all shadow-md active:scale-95 duration-300 ease-in-out hover:shadow-lg"
                    title="Log Out"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              )}
            </>
          )}

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
            {!loading && !user && (
              <div className="pt-2 sm:hidden">
                <GoogleSignInButton themed={true}/>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
