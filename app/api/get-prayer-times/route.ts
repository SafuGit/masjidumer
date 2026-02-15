import { NextResponse } from "next/server";
import { db } from "@/app/(lib)/firebase-admin.init";

export async function GET() {
  try {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    const prayerTimesResponse = await fetch(
      `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=54.58259526021764&longitude=-5.942080220410637&calendarMethod=UAQ&method=2&school=1`
    );
    const prayerTimesData = await prayerTimesResponse.json();

    const jamaatDocRef = db.collection("prayer-times").doc("jamaat");
    const jamaatDoc = await jamaatDocRef.get();

    const jamaatTimes = jamaatDoc.exists ? jamaatDoc.data() : null;

    return NextResponse.json({
      prayerTimes: prayerTimesData,
      jamaat: jamaatTimes,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch prayer times", details: err },
      { status: 500 }
    );
  }
}
