/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { createUserDocument } from "@/app/(lib)/firestore-roles";
import { checkAndAssignSuperAdmin } from "@/app/(lib)/admin-roles";
import { getAuth } from "firebase-admin/auth";

const auth = getAuth();

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ error: "Missing ID token" }, { status: 400 });
    }

    const decodedToken = await auth.verifyIdToken(idToken);
    const user = await auth.getUser(decodedToken.uid);

    const role = await createUserDocument(
      user.uid,
      user.email || "",
      user.displayName || undefined,
    );

    // Automatically assign super-admin role if UID is in the list (only if not already assigned)
    const assignResult = await checkAndAssignSuperAdmin(user.uid);
    
    // Get the final role - refresh user only if role was just assigned
    let customRole = user.customClaims?.role || role;
    if (assignResult.success && assignResult.message !== 'User already has super-admin role') {
      const updatedUser = await auth.getUser(user.uid);
      customRole = updatedUser.customClaims?.role || role;
    }

    return NextResponse.json({
      success: true,
      role: customRole,
      uid: user.uid,
    });
  } catch (error: any) {
    console.error("Error initializing user:", error);
    return NextResponse.json(
      { error: error.message || "Failed to initialize user" },
      { status: 500 },
    );
  }
}
