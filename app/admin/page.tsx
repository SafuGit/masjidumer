"use client";

import { useAuth } from "@/app/(lib)/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminPanel } from "@/app/(components)/admin/AdminPanel";

export default function AdminPage() {
  const { user, isSuperAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !isSuperAdmin)) {
      router.push("/");
    }
  }, [user, isSuperAdmin, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !isSuperAdmin) {
    return null;
  }

  return <AdminPanel />;
}
