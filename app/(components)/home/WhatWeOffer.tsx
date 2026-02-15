import { BookOpen, Heart, Calendar, ArrowRight } from 'lucide-react';

const WhatWeOffer = () => {
  const services = [
    {
      icon: BookOpen,
      title: 'Islamic Education',
      description: 'Comprehensive Madrasah classes for children and adult learning circles focusing on Quran and Sunnah.',
      linkText: 'Learn More',
      linkHref: '#',
    },
    {
      icon: Heart,
      title: 'Social Welfare',
      description: 'Support programs including food bank, youth mentoring, and counseling services for those in need.',
      linkText: 'Get Support',
      linkHref: '#',
    },
    {
      icon: Calendar,
      title: 'Community Events',
      description: 'Join us for regular gatherings, workshops, and family events designed to strengthen community bonds.',
      linkText: 'Upcoming Events',
      linkHref: '#',
    },
  ];

  return (
    <section className="py-20 bg-emerald-50/50 dark:bg-black/20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-bold uppercase tracking-widest text-xs mb-3 block">
            What we offer
          </span>
          <h3 className="text-4xl font-display text-primary dark:text-emerald-400 mb-6">
            Dedicated to Community Service
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Masjid Umer is more than just a place of prayer. We strive to provide resources and support for all members of our diverse community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-emerald-900/10 rounded-3xl p-8 border border-emerald-100 dark:border-emerald-900/50 hover:-translate-y-2 transition-transform shadow-sm hover:shadow-xl group"
              >
                <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950 rounded-2xl flex items-center justify-center mb-6 text-primary dark:text-emerald-400 group-hover:bg-primary group-hover:text-white transition-colors">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-display text-primary dark:text-emerald-400 mb-4">
                  {service.title}
                </h4>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  {service.description}
                </p>
                <a
                  className="text-accent font-bold inline-flex items-center gap-2 group/link"
                  href={service.linkHref}
                >
                  {service.linkText}{' '}
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;