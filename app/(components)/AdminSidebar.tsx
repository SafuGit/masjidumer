'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, GraduationCap, Settings, Building, LogOut } from 'lucide-react';
import { auth } from '@/app/(lib)/firebase.init';
import { signOut } from 'firebase/auth';

const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const navItems = [
    { href: '/', label: 'Go Back Home', icon: ArrowLeft },
    { href: '/admin', label: 'Prayer Times', icon: Clock },
    { href: '/admin/events', label: 'Events', icon: Calendar },
    { href: '/admin/classes', label: 'Classes', icon: GraduationCap },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-primary text-white flex flex-col fixed inset-y-0 left-0 z-50">
      {/* Logo/Branding Section */}
      <div className="p-6 border-b border-emerald-800/50">
        <div className="flex items-center gap-3">
          <div className="bg-accent p-1.5 rounded">
            <Building className="text-white" size={24} />
          </div>
          <div>
            <h1 className="font-display font-bold text-sm tracking-wider">MASJID UMER</h1>
            <p className="text-[9px] uppercase tracking-widest opacity-60">Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3.5 transition-all ${
                isActive(item.href)
                  ? 'bg-emerald-800 text-white border-l-4 border-accent'
                  : 'text-emerald-100/70 hover:bg-emerald-800/50 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="p-6 border-t border-emerald-800/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-xs font-bold">
            JD
          </div>
          <div className="text-xs">
            <p className="font-semibold">Super Admin</p>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1 opacity-50 hover:underline hover:opacity-100 transition-opacity"
            >
              <LogOut size={12} />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;