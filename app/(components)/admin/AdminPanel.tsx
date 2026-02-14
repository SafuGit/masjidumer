"use client";

import { useAuth } from '@/app/(lib)/auth-context';
import { useState, useEffect } from 'react';

export function AdminPanel() {
  const { user, role, isSuperAdmin, loading } = useAuth();
  const [jamaatTimes, setJamaatTimes] = useState({
    Fajr: '',
    Dhuhr: '',
    Asr: '',
    Maghrib: '',
    Isha: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchJamaatTimes();
  }, []);

  const fetchJamaatTimes = async () => {
    try {
      const response = await fetch('/api/update-jamaat-times');
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
      console.error('Error fetching jamaat times:', error);
    }
  };

  const formatTimeForInput = (time: string) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  };

  const handleInputChange = (prayer: string, value: string) => {
    setJamaatTimes(prev => ({
      ...prev,
      [prayer]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/update-jamaat-times', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jamaatTimes),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Jamaat times updated successfully!' });
      } else {
        const error = await response.json();
        setMessage({ type: 'error', text: error.error || 'Failed to update jamaat times' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while updating jamaat times' });
      console.error('Error:', error);
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Super Admin Panel</h1>
      <p>Welcome, {user.displayName || user.email}</p>
      <p>Your role: {role}</p>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Update Jamaat Times</h2>
        
        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
          {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((prayer) => (
            <div key={prayer} className="flex items-center gap-4">
              <label htmlFor={prayer} className="w-24 font-medium">
                {prayer}:
              </label>
              <input
                type="time"
                id={prayer}
                value={jamaatTimes[prayer as keyof typeof jamaatTimes]}
                onChange={(e) => handleInputChange(prayer, e.target.value)}
                required
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:border-gray-600"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Updating...' : 'Update Jamaat Times'}
          </button>

          {message && (
            <div
              className={`p-3 rounded-md ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}
            >
              {message.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
