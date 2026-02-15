import { getApps, initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  initializeApp({
    credential: cert(process.env.FIREBASE_SECRET_KEY as ServiceAccount),
  });
}

export const db = getFirestore();
