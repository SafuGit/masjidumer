"use client";

import { useAuth } from '@/app/(lib)/auth-context';

export function AdminPanel() {
  const { user, role, isSuperAdmin, loading } = useAuth();

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
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Admin Actions</h2>
      </div>
    </div>
  );
}
