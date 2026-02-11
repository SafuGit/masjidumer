/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { setCustomRole } from '@/app/(lib)/admin-roles';
import { getAuth } from 'firebase-admin/auth';

const auth = getAuth();

export async function POST(request: NextRequest) {
  try {
    const { uid, role, adminToken } = await request.json();

    if (!uid || !role) {
      return NextResponse.json(
        { error: 'Missing uid or role' },
        { status: 400 }
      );
    }

    if (!adminToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decodedToken = await auth.verifyIdToken(adminToken);
    const adminUser = await auth.getUser(decodedToken.uid);
    
    if (adminUser.customClaims?.role !== 'super-admin') {
      return NextResponse.json(
        { error: 'Only super-admins can assign roles' },
        { status: 403 }
      );
    }

    const result = await setCustomRole(uid, role);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in set-role API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to set role' },
      { status: 500 }
    );
  }
}
