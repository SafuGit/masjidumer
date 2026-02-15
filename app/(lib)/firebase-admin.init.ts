import { getApps, initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  const serviceAccount = JSON.parse(
    process.env.FIREBASE_SECRET_KEY || '{}'
  ) as ServiceAccount;

  initializeApp({
    credential: cert(serviceAccount),
  });
}

export const db = getFirestore();
