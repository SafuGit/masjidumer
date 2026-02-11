import Hero from "./(components)/home/Hero";
import PrayerTimes from "./(components)/home/PrayerTimes";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black w-full">
      <Hero />
      <PrayerTimes />
    </div>
  );
}
