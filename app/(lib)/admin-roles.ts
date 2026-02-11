/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuth } from 'firebase-admin/auth';
import { db } from './firebase-admin.init';

const auth = getAuth();

export type UserRole = 'super-admin' | 'user';

export const SUPER_ADMIN_UIDS = [
  'oswO3wiOHmO7jbF5KbevsUahYur2',
];

export async function setCustomRole(uid: string, role: UserRole) {
  try {
    await auth.setCustomUserClaims(uid, { role });
    
    await db.collection('users').doc(uid).set({ role }, { merge: true });
    
    console.log(`Role ${role} set for user ${uid}`);
    return { success: true, message: `Role ${role} assigned successfully` };
  } catch (error: any) {
    console.error('Error setting custom role:', error);
    return { success: false, message: error.message };
  }
}

export async function getUserCustomClaims(uid: string) {
  try {
    const user = await auth.getUser(uid);
    return user.customClaims?.role || 'user';
  } catch (error: any) {
    console.error('Error getting custom claims:', error);
    return null;
  }
}

export async function revokeAdminRole(uid: string) {
  return await setCustomRole(uid, 'user');
}

export async function checkAndAssignSuperAdmin(uid: string) {
  if (SUPER_ADMIN_UIDS.includes(uid)) {
    // Check if user already has super-admin role to avoid redundant updates
    const currentRole = await getUserCustomClaims(uid);
    if (currentRole !== 'super-admin') {
      console.log(`Auto-assigning super-admin role to ${uid}`);
      return await setCustomRole(uid, 'super-admin');
    }
    return { success: true, message: 'User already has super-admin role' };
  }
  return { success: false, message: 'UID not in super-admin list' };
}

export function isSuperAdminUID(uid: string): boolean {
  return SUPER_ADMIN_UIDS.includes(uid);
}
