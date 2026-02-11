"use client";

import { FirebaseUIProvider } from "@firebase-oss/ui-react";
import { ui } from "@/app/(lib)/firebase.init";
import { AuthProvider } from "@/app/(lib)/auth-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseUIProvider ui={ui}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </FirebaseUIProvider>
  );
}
