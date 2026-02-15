"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin, Users, Image as ImageIcon, Plus } from "lucide-react";

interface EventForm {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  capacity?: number;
  imageUrl?: string;
  registerLink?: string;
}

export default function EventsPage() {
  const [formData, setFormData] = useState<EventForm>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "general",
    capacity: undefined,
    imageUrl: "",
    registerLink: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create event");
      }

      setMessage({ type: "success", text: "Event created successfully!" });
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        category: "general",
        capacity: undefined,
        imageUrl: "",
        registerLink: "",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to create event",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "capacity" ? (value ? parseInt(value) : undefined) : value,
    }));
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-primary dark:text-emerald-400 mb-2">
            Create New Event
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Add a new community event to the calendar
          </p>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-emerald-900/10 rounded-2xl p-8 border border-emerald-100 dark:border-emerald-900/50 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Event Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-emerald-800 bg-white dark:bg-emerald-950/50 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500 focus:border-transparent"
              placeholder="e.g., Ramadan Iftar Dinner"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-emerald-800 bg-white dark:bg-emerald-950/50 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500 focus:border-transparent"
              placeholder="Provide details about the event..."
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="date" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Date *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-emerald-800 bg-white dark:bg-emerald-950/50 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Time *
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-emerald-800 bg-white dark:bg-emerald-950/50 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-emerald-800 bg-white dark:bg-emerald-950/50 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500 focus:border-transparent"
              placeholder="e.g., Main Prayer Hall"
            />
          </div>

          {/* Category and Capacity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-emerald-800 bg-white dark:bg-emerald-950/50 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="general">General</option>
                <option value="education">Education</option>
                <option value="social">Social</option>
                <option value="youth">Youth</option>
                <option value="family">Family</option>
                <option value="ramadan">Ramadan</option>
                <option value="eid">Eid</option>
              </select>
            </div>

            <div>
              <label htmlFor="capacity" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                <Users className="w-4 h-4 inline mr-2" />
                Capacity (Optional)
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity || ""}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-emerald-800 bg-white dark:bg-emerald-950/50 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500 focus:border-transparent"
                placeholder="Maximum attendees"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              <ImageIcon className="w-4 h-4 inline mr-2" />
              Image URL (Optional)
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-emerald-800 bg-white dark:bg-emerald-950/50 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Register Link */}
          <div>
            <label htmlFor="registerLink" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Registration Link (Optional)
            </label>
            <input
              type="url"
              id="registerLink"
              name="registerLink"
              value={formData.registerLink}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-emerald-800 bg-white dark:bg-emerald-950/50 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500 focus:border-transparent"
              placeholder="https://forms.google.com/..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary hover:bg-emerald-900 text-white px-8 py-3.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Create Event
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
