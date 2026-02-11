"use client";
import React, { useEffect, useState } from "react";
import { Sun, Cloud, Moon, Sunrise, Sunset } from "lucide-react"; // Lucide React icons

// Map prayer names to Lucide icons
const prayerIcons = {
  Fajr: Sunrise,
  Dhuhr: Sun,
  Asr: Cloud,
  Maghrib: Sunset,
  Isha: Moon,
};

interface PrayerTime {
  name: string;
  begins: string;
  jamaah: string;
  sunrise?: string;
  current?: boolean;
}

const PrayerTimes = () => {
  const [prayerSchedule, setPrayerSchedule] = useState<PrayerTime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/get-prayer-times")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        const timings = data.prayerTimes?.data?.timings;
        const jamaatTimes = data.jamaat;
        
        if (timings && jamaatTimes) {
          const formatTime = (time24: string) => {
            const [hours, minutes] = time24.split(':');
            const hour = parseInt(hours);
            const ampm = hour >= 12 ? 'pm' : 'am';
            const hour12 = hour % 12 || 12;
            return `${hour12}:${minutes} ${ampm}`;
          };

          const schedule: PrayerTime[] = [
            {
              name: "Fajr",
              begins: formatTime(timings.Fajr),
              jamaah: formatTime(jamaatTimes.Fajr),
              sunrise: formatTime(timings.Sunrise),
            },
            {
              name: "Dhuhr",
              begins: formatTime(timings.Dhuhr),
              jamaah: formatTime(jamaatTimes.Dhuhr),
            },
            {
              name: "Asr",
              begins: formatTime(timings.Asr),
              jamaah: formatTime(jamaatTimes.Asr),
            },
            {
              name: "Maghrib",
              begins: formatTime(timings.Maghrib),
              jamaah: formatTime(jamaatTimes.Maghrib),
            },
            {
              name: "Isha",
              begins: formatTime(timings.Isha),
              jamaah: formatTime(jamaatTimes.Isha),
            },
          ];

          setPrayerSchedule(schedule);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching prayer times:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-20 relative overflow-hidden" id="prayer-times">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-slate-500 dark:text-slate-400">Loading prayer times...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative overflow-hidden" id="prayer-times">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-12 gap-6">
          <div className="text-center lg:text-left">
            <h3 className="text-3xl font-display text-primary dark:text-emerald-400 mb-2">
              Daily Prayer Times
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Current prayer schedule for our community
            </p>
          </div>
          <a
            className="inline-flex items-center gap-2 px-6 py-2 border-2 border-primary/20 dark:border-emerald-800 hover:border-primary text-primary dark:text-emerald-400 rounded-full font-semibold transition-all"
            href="#"
          >
            Full Monthly Timetable
          </a>
        </div>

        {/* Prayer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {prayerSchedule.map((prayer) => {
            const Icon = prayerIcons[prayer.name as keyof typeof prayerIcons];

            return (
              <div
                key={prayer.name}
                className={`shrink-0 w-full h-full ${
                  prayer.current
                    ? "bg-primary text-white border border-primary rounded-2xl p-6 shadow-2xl scale-105 z-10"
                    : "bg-white dark:bg-emerald-900/20 border border-emerald-50 dark:border-emerald-800/50 rounded-2xl p-6 transition-all hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-700"
                } flex flex-col items-center text-center relative group min-w-0`}
              >
                {prayer.current && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    Current
                  </div>
                )}
                <Icon className={`text-4xl mb-4 text-accent`} />
                <h4
                  className={`text-xl font-display mb-6 ${
                    prayer.current ? "" : "text-primary dark:text-emerald-400"
                  }`}
                >
                  {prayer.name}
                </h4>
                <div className="w-full space-y-4 min-w-0">
                  <div className="flex justify-between items-center text-sm">
                    <span
                      className={
                        prayer.current
                          ? "text-emerald-100/70"
                          : "text-slate-400"
                      }
                    >
                      Begins
                    </span>
                    <span className="font-bold text-lg">{prayer.begins}</span>
                  </div>
                  <div
                    className={`flex justify-between items-center p-3 rounded-xl border gap-2 ${
                      prayer.current
                        ? "bg-emerald-800/50 border-emerald-700/50"
                        : "bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/50"
                    }`}
                  >
                    <span
                      className={
                        prayer.current
                          ? "text-emerald-100 font-medium"
                          : "text-primary dark:text-emerald-300 font-medium"
                      }
                    >
                      Jama`ah
                    </span>
                    <span
                      className={`font-bold text-lg ${
                        prayer.current
                          ? "text-emerald-100"
                          : "text-primary dark:text-emerald-300"
                      }`}
                    >
                      {prayer.jamaah}
                    </span>
                  </div>
                  {prayer.sunrise && (
                    <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-100 dark:border-emerald-800/50">
                      <span className="text-slate-400">Sunrise</span>
                      <span className="font-medium">{prayer.sunrise}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PrayerTimes;
