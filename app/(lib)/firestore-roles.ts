import { db } from './firebase-admin.init';

export type UserRole = 'super-admin' | 'user';

export async function setUserRole(uid: string, role: UserRole) {
  await db.collection('users').doc(uid).set({ role }, { merge: true });
}

export async function getUserRole(uid: string): Promise<UserRole | null> {
  const doc = await db.collection('users').doc(uid).get();
  return doc.exists ? (doc.data()?.role as UserRole) : null;
}

export async function createUserDocument(uid: string, email: string, displayName?: string) {
  const existingDoc = await db.collection('users').doc(uid).get();
  
  if (!existingDoc.exists) {
    await db.collection('users').doc(uid).set({
      email,
      displayName: displayName || null,
      role: 'user',
      createdAt: new Date().toISOString(),
    });
    return 'user' as UserRole;
  }
  
  return existingDoc.data()?.role as UserRole;
}
