/* eslint-disable @next/next/no-img-element */
"use client";

import { Apple, ChevronRight, Goal } from "lucide-react";
import React from "react";

const AboutUs = () => {
  return (
    <main className="min-h-screen relative bg-pattern-subtle bg-fixed font-body text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-primary text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-4xl md:text-5xl mb-4">About Us</h2>
          <div className="flex items-center justify-center gap-2 text-emerald-100/80 text-sm">
            <a className="hover:text-white transition-colors" href="#">Home</a>
            <ChevronRight />
            <span className="text-accent font-medium">About Us</span>
          </div>
        </div>
      </section>

      {/* Sections */}
      <div className="container mx-auto px-6 py-16 space-y-12">

        {/* Our Masjid */}
        <section className="max-w-4xl mx-auto" id="our-masjid">
          <div className="bg-white dark:bg-emerald-900/10 rounded-3xl overflow-hidden border border-emerald-100 dark:border-emerald-900/50 card-shadow">
            <div className="p-8 md:p-12 text-center">
              <h3 className="font-display text-3xl text-primary dark:text-emerald-400 mb-8 relative inline-block">
                Our Masjid
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-accent"></div>
              </h3>
              <div className="aspect-21/9 rounded-2xl overflow-hidden mb-10 shadow-lg">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYgEV5rQEISq3RknnjDsKJtFdD1m_OiO1Q0SfGIzTOX5N1k_FGF6IF67MmdBLCyj2ss918-fndsoQ-d7yklG-xTH3sVhSJdI4giJkmZjgR-VSTXy2ef7Od8y7U7HlpmzJtHpyjHd1iFXFWFe7CtHpRKXdm91p-HU6Z5zv6B37t61oMLLcbixn8fGbm8WVZCmw82lK325Yk2ayW6HVIm2sOxGYssscR5FhnE5ZAyZfnT8KlZ9qRHKeGoD9i9-4m3LgxcrwRXCh5_k4"
                  alt="Beautiful Arched Mosque Interior"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="max-w-2xl mx-auto space-y-6">
                <h4 className="text-xl font-bold text-slate-800 dark:text-white">
                  Established to serve the community, harness spiritual development and improve community cohesion.
                </h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Masjid Umer is a cornerstone of spiritual life in our community. We are open to visitors throughout the year with regular visits from schools, colleges, and organizations looking to learn more about the Masjid and the religion of Islam.
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  The Masjid accommodates up to 500 worshippers at any one time, providing facilities for five daily prayers, inter-faith community projects, and regular educational circles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* History */}
        <section className="max-w-4xl mx-auto" id="history">
          <div className="bg-white dark:bg-emerald-900/10 rounded-3xl overflow-hidden border border-emerald-100 dark:border-emerald-900/50 card-shadow">
            <div className="p-8 md:p-12 text-center">
              <h3 className="font-display text-3xl text-primary dark:text-emerald-400 mb-8 relative inline-block">
                History
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-accent"></div>
              </h3>
              <div className="aspect-21/9 rounded-2xl overflow-hidden mb-10 shadow-lg">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEKcwEWdDjmepardZ2kgxp5u1D_xbvNMkRO4K_0_Jqy5xJvgJ9e3myJDANA4_-G1Z86sCqX-zZHsPnK45QNPlztHIpmOFwbBaWckGW2jNdnRM8DEotrdEY5sRoIfekPVdTNAWDagRrHcM6u50I4iwqnidgZVFGbhE9Ki8brjLXvzvLE5wdc-FigO2HhkXEOjOSdC098cnP3bv_PSiCWtrtc4IcWMv_IsHysthT-EFon4jditAj1kyfSaJ31ShW5gHhIVr_rxh-Lik"
                  alt="Quran and Prayer Beads"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="max-w-2xl mx-auto space-y-6">
                <h4 className="text-xl font-bold text-slate-800 dark:text-white">
                  A rich history of faith and dedication dating back to 1995.
                </h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  The need for a local mosque was vital to serve the growing community. A group of dedicated locals came together and decided it was time to establish a much-needed prayer space and community hub that would serve and benefit the community for years to come.
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  From humble beginnings in a converted residential space, our community has grown through generous support and tireless volunteering, allowing us to expand our facilities into the landmark structure we call home today.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="max-w-4xl mx-auto" id="vision">
          <div className="bg-white dark:bg-emerald-900/10 rounded-3xl overflow-hidden border border-emerald-100 dark:border-emerald-900/50 card-shadow">
            <div className="p-8 md:p-12 text-center">
              <h3 className="font-display text-3xl text-primary dark:text-emerald-400 mb-8 relative inline-block">
                Vision &amp; Mission
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-accent"></div>
              </h3>
              <div className="aspect-21/9 rounded-2xl overflow-hidden mb-10 shadow-lg">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5A_yYruqSF9UwVJ0EYOMPZIQK16f8cF2u045cvD8xK0_Au70FsEfVY2HajFuEMIZIyMOnSG_zqxt-hfciSVTIoBDgV8J4M2dmRqL4LoDxNcprRpolD2MZz0ra9mynDtY2DDKMBoZNz7OGtJQdZC6gZ3gIm9Cly2dh0d_TP8ZKArfBS_L_O6CGiWYV7bS7HGFOPeIuzbBKL321HU9Ep9799UsMXaV1EdNxIKBkwDDX0hUWiBfvBCojn0gFDvC6ZC6BRPxlT7dV9p0"
                  alt="Community Engagement"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="max-w-2xl mx-auto space-y-6">
                <h4 className="text-xl font-bold text-slate-800 dark:text-white">
                  Striving for spiritual excellence and community empowerment.
                </h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Our vision is to be a model community centered around the teachings of the Quran and the Sunnah of the Prophet Muhammad (peace be upon him). We aim to provide a welcoming environment for spiritual growth and intellectual development.
                </p>
                <div className="grid md:grid-cols-2 gap-8 text-left mt-10">
                  <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800">
                    <Goal />
                    <h5 className="font-display text-lg text-primary dark:text-emerald-400 mb-2">Our Mission</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      To nurture a God-conscious community through education, worship, and selfless service to humanity.
                    </p>
                  </div>
                  <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800">
                    <Apple />
                    <h5 className="font-display text-lg text-primary dark:text-emerald-400 mb-2">Our Values</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Compassion, inclusivity, and integrity are the pillars that guide every initiative we undertake.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
};

export default AboutUs;