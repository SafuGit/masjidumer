import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/(lib)/firebase-admin.init";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { Fajr, Dhuhr, Asr, Maghrib, Isha } = body;

    if (!Fajr || !Dhuhr || !Asr || !Maghrib || !Isha) {
      return NextResponse.json(
        { error: "All prayer times are required" },
        { status: 400 }
      );
    }

    await db.collection("prayer-times").doc("jamaat").set({
      Fajr,
      Dhuhr,
      Asr,
      Maghrib,
      Isha,
    });

    return NextResponse.json(
      { message: "Jamaat times updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating jamaat times:", error);
    return NextResponse.json(
      { error: "Failed to update jamaat times" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const jamaatDoc = await db.collection("prayer-times").doc("jamaat").get();

    if (!jamaatDoc.exists) {
      return NextResponse.json(
        { error: "Jamaat times not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(jamaatDoc.data(), { status: 200 });
  } catch (error) {
    console.error("Error fetching jamaat times:", error);
    return NextResponse.json(
      { error: "Failed to fetch jamaat times" },
      { status: 500 }
    );
  }
}
