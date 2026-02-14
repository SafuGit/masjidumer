/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useAuth } from "@/app/(lib)/auth-context";
import { useState, useEffect } from "react";
import {
  Sunrise,
  Sun,
  CloudSun,
  Sunset,
  Moon,
  Clock,
  Save,
  Loader2,
  CheckCircle,
  XCircle,
  ShieldCheck,
} from "lucide-react";

export function AdminPanel() {
  const { user, role, isSuperAdmin, loading } = useAuth();
  const [jamaatTimes, setJamaatTimes] = useState({
    Fajr: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    fetchJamaatTimes();
  }, []);

  const fetchJamaatTimes = async () => {
    try {
      const response = await fetch("/api/update-jamaat-times");
      if (response.ok) {
        const data = await response.json();
        const formattedData = {
          Fajr: formatTimeForInput(data.Fajr),
          Dhuhr: formatTimeForInput(data.Dhuhr),
          Asr: formatTimeForInput(data.Asr),
          Maghrib: formatTimeForInput(data.Maghrib),
          Isha: formatTimeForInput(data.Isha),
        };
        setJamaatTimes(formattedData);
      }
    } catch (error) {
      console.error("Error fetching jamaat times:", error);
    }
  };

  const formatTimeForInput = (time: string) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
  };

  const handleInputChange = (prayer: string, value: string) => {
    setJamaatTimes((prev) => ({
      ...prev,
      [prayer]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/update-jamaat-times", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jamaatTimes),
      });

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Jamaat times updated successfully!",
        });
      } else {
        const error = await response.json();
        setMessage({
          type: "error",
          text: error.error || "Failed to update jamaat times",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred while updating jamaat times",
      });
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(jamaatTimes);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please sign in to access this page.</div>;
  }

  if (!isSuperAdmin) {
    return <div>You don&apos;t have permission to access this page.</div>;
  }

  const prayerConfig = {
    Fajr: { icon: Sunrise, color: "text-orange-500" },
    Dhuhr: { icon: Sun, color: "text-yellow-500" },
    Asr: { icon: CloudSun, color: "text-amber-500" },
    Maghrib: { icon: Sunset, color: "text-red-500" },
    Isha: { icon: Moon, color: "text-indigo-500" },
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-emerald-100 dark:border-emerald-900">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Welcome back,{" "}
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {user.displayName || user.email}
                </span>
              </p>
              <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                <ShieldCheck className="w-3 h-3 mr-1" />
                {role}
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="w-20 h-20 bg-linear-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Clock className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Jamaat Times Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-emerald-100 dark:border-emerald-900">
          <div className="bg-linear-to-r from-emerald-600 to-teal-600 p-6 text-white">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Clock className="w-8 h-8" />
              Manage Jamaat Times
            </h2>
            <p className="text-emerald-100 mt-1 text-sm">
              Update prayer congregation times for the masjid
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {(
                Object.keys(prayerConfig) as Array<keyof typeof prayerConfig>
              ).map((prayer) => {
                const { icon: Icon, color } = prayerConfig[prayer];
                return (
                  <div
                    key={prayer}
                    className="group relative bg-linear-to-br from-gray-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-5 border-2 border-gray-200 dark:border-gray-600 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all duration-300 hover:shadow-lg cursor-pointer"
                    onClick={() => {
                      const input = document.getElementById(
                        prayer,
                      ) as HTMLInputElement | null;
                      input?.showPicker?.();
                    }}
                  >
                    <label
                      htmlFor={prayer}
                      className="flex items-center gap-3 mb-3 cursor-pointer"
                    >
                      <div className={`${color}`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <span className="text-lg font-bold text-gray-800 dark:text-white block">
                          {prayer}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Jamaat Time
                        </span>
                      </div>
                    </label>
                    <input
                      type="time"
                      id={prayer}
                      value={jamaatTimes[prayer as keyof typeof jamaatTimes]}
                      onChange={(e) =>
                        handleInputChange(prayer, e.target.value)
                      }
                      required
                      className="w-full px-4 py-3 text-lg font-semibold bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-emerald-700 dark:text-emerald-400 cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-3 text-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Updating Times...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Update Jamaat Times
                </>
              )}
            </button>

            {message && (
              <div
                className={`mt-6 p-4 rounded-xl border-2 flex items-start gap-3 animate-in slide-in-from-top duration-300 ${
                  message.type === "success"
                    ? "bg-green-50 border-green-300 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-green-200"
                    : "bg-red-50 border-red-300 text-red-800 dark:bg-red-900/30 dark:border-red-700 dark:text-red-200"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle className="w-6 h-6 shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 shrink-0" />
                )}
                <div>
                  <p className="font-semibold">
                    {message.type === "success" ? "Success!" : "Error"}
                  </p>
                  <p className="text-sm mt-1">{message.text}</p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
