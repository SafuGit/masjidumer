"use client";
import { Calendar } from "lucide-react";
import moment from "moment";
import momentHijri from "moment-hijri";
import React from "react";

const Hero = () => {
  const gregorianNow = moment().locale('en').format("DD MMMM YYYY");
  const hijriNow = momentHijri().locale('en').format("iDD iMMMM iYYYY");

  return (
    <section className="relative w-full h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/mosque-bg.png"
        alt="Beautiful Mosque Interior"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlays */}
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="absolute inset-0 islamic-pattern"></div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center text-white">
        <h2 className="font-display text-4xl md:text-6xl mb-6 leading-tight">
          Welcome to Masjid Umer
        </h2>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light leading-relaxed opacity-90">
          A place of prayer, reflection, and community service. Join us in our
          journey of spiritual growth and brotherhood.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#prayer-times"
            className="bg-accent hover:bg-amber-600 text-white px-8 py-3.5 rounded-full font-bold shadow-lg transition-all hover:-translate-y-1"
          >
            Daily Prayer Times
          </a>
          <a
            href="#"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-3.5 rounded-full font-bold transition-all"
          >
            Our Services
          </a>
        </div>
      </div>

      {/* Bottom Date Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-primary/90 dark:bg-black/40 backdrop-blur-sm py-4 border-t border-white/10">
        <div className="container mx-auto px-6 flex justify-center items-center gap-4 text-white font-medium">
          <span className="flex items-center gap-2">
            <Calendar />
            {gregorianNow}
          </span>
          <span className="opacity-30">•</span>
          <span className="flex items-center gap-2">
            {hijriNow}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
