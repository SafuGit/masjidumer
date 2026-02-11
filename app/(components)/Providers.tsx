"use client";

import { FirebaseUIProvider } from "@firebase-oss/ui-react";
import { ui } from "@/app/(lib)/firebase.init";

export function Providers({ children }: { children: React.ReactNode }) {
  return <FirebaseUIProvider ui={ui}>{children}</FirebaseUIProvider>;
}
