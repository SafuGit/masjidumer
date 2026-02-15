"use client";
import { MapPin, Phone, Mail, Facebook, Instagram, AtSign } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  const navLinks = [
    { name: 'Prayer Times', href: '#' },
    { name: 'Ramadan Calendar', href: '#' },
    { name: 'Zakat Calculator', href: '#' },
    { name: 'Become a Member', href: '#' },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      text: '123 Spiritual Way, Serenity City, SC 45678',
    },
    {
      icon: Phone,
      text: '+1 (234) 567-8900',
    },
    {
      icon: Mail,
      text: 'info@masjidumer.org',
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: AtSign, href: '#' },
  ];

  if (pathname.startsWith("/admin")) return <></>

  return (
    <footer className="bg-primary dark:bg-emerald-950 text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 border-b border-white/10 pb-12">
          {/* Logo and Description */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <h1 className="font-display font-bold text-2xl tracking-wider">MASJID UMER</h1>
            </div>
            <p className="text-emerald-100/70 mb-6 text-sm leading-relaxed">
              Dedicated to serving the community through prayer, education, and mutual support since 1995.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                    href={social.href}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Nav Links */}
          <div>
            <h5 className="font-display text-lg mb-6 text-accent">Nav Links</h5>
            <ul className="space-y-4 text-sm text-emerald-100/70">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a className="hover:text-white transition-colors" href={link.href}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-display text-lg mb-6 text-accent">Contact</h5>
            <ul className="space-y-4 text-sm text-emerald-100/70">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <li key={index} className="flex items-start gap-3">
                    <IconComponent className="w-4 h-4 mt-1 text-accent shrink-0" />
                    <span>{contact.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] uppercase tracking-widest text-emerald-100/40">
          <p>© 2026 Masjid Umer. All rights reserved.</p>
          <div className="flex gap-8">
            <a className="hover:text-white transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-white transition-colors" href="#">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;