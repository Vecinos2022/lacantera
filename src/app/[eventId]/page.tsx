"use client";

import Countdown from "@/components/Countdown";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import { VenueDetails } from "@/components/VenueDetails";
import ScheduleStep from "@/components/eldora/ScheduleStep";

export default function Home() {
  return (
    <div className="grid grid-cols-1 -gap-1">
      <Navbar />
      <HeroSection />
      <Countdown />
      <VenueDetails />
      <ScheduleStep />
    </div>
  );
}
