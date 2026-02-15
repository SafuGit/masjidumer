/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Filter,
  Search,
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  capacity?: number;
  imageUrl?: string;
  registerLink?: string;
  status: string;
  registrations: number;
}

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { value: "all", label: "All Events" },
    { value: "general", label: "General" },
    { value: "education", label: "Education" },
    { value: "social", label: "Social" },
    { value: "youth", label: "Youth" },
    { value: "family", label: "Family" },
    { value: "ramadan", label: "Ramadan" },
    { value: "eid", label: "Eid" },
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events, selectedCategory, searchQuery]);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events?status=upcoming");
      const data = await response.json();
      setEvents(data.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = events;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (event) => event.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      general: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
      education: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
      social: "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-300",
      youth: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300",
      family: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
      ramadan: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300",
      eid: "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300",
    };
    return colors[category] || colors.general;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading events...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark py-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-accent font-bold uppercase tracking-widest text-xs mb-3 block">
            Community Calendar
          </span>
          <h1 className="text-4xl md:text-5xl font-display text-primary dark:text-emerald-400 mb-6">
            Upcoming Events
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Join us for inspiring gatherings, educational programs, and
            community celebrations
          </p>
        </div>

        {/* Filters */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-white dark:bg-emerald-900/10 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-900/50">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 dark:border-emerald-800 bg-white dark:bg-emerald-950/50 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="md:w-64 relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 dark:border-emerald-800 bg-white dark:bg-emerald-950/50 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500 focus:border-transparent appearance-none cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
              No events found
            </h3>
            <p className="text-slate-500 dark:text-slate-500">
              {searchQuery || selectedCategory !== "all"
                ? "Try adjusting your filters"
                : "Check back soon for upcoming events"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white dark:bg-emerald-900/10 rounded-3xl overflow-hidden border border-emerald-100 dark:border-emerald-900/50 hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                {/* Image */}
                {event.imageUrl ? (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-linear-to-br from-primary to-emerald-600 flex items-center justify-center">
                    <Calendar className="w-16 h-16 text-white/30" />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${getCategoryColor(
                      event.category
                    )}`}
                  >
                    {event.category.charAt(0).toUpperCase() +
                      event.category.slice(1)}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-display font-bold text-primary dark:text-emerald-400 mb-3">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-2 border-t border-slate-100 dark:border-emerald-800/50 pt-4">
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <Calendar className="w-4 h-4 text-accent shrink-0" />
                      <span>{formatDate(event.date)}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <Clock className="w-4 h-4 text-accent shrink-0" />
                      <span>{event.time}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <MapPin className="w-4 h-4 text-accent shrink-0" />
                      <span>{event.location}</span>
                    </div>

                    {event.capacity && (
                      <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <Users className="w-4 h-4 text-accent shrink-0" />
                        <span>
                          {event.registrations} / {event.capacity} registered
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Register Button */}
                  {event.registerLink ? (
                    <a
                      href={event.registerLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 w-full bg-primary hover:bg-emerald-900 text-white py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg block text-center cursor-pointer"
                    >
                      Register Now
                    </a>
                  ) : (
                    <button
                      disabled
                      className="mt-6 w-full bg-slate-400 dark:bg-slate-700 text-white py-3 rounded-lg font-semibold cursor-not-allowed opacity-60"
                    >
                      Registration Unavailable
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;