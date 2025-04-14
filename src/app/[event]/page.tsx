"use client";

import Countdown from "@/components/Countdown";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Quote from "@/components/Quote";
import { VenueDetails } from "@/components/VenueDetails";
import ScheduleStep from "@/components/eldora/ScheduleStep";


import { useParams } from "next/navigation";
import { eventData } from "../constants/constants";
import { useEffect } from "react";


export default function Home() {
  const params = useParams(); 
  const event = decodeURIComponent(params.event as string) as "j&a" | "c&k"; 

  console.log("Event parameter:", event); 


  useEffect(() => {
    if (event && eventData[event]) {
      document.title = `${eventData[event].title}`;
    }
  }, [event]);
  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen text-black font-bold">
        Oops! Este elemento no existe.
      </div>
    ); 
  }

  return (
    <div className="grid grid-cols-1 -gap-1">
      <Navbar currentEvent={event} />
      <HeroSection currentEvent={event} />
      <Countdown  currentEvent={event}/>
      <Quote  currentEvent={event} />
      <VenueDetails currentEvent={event}/>
      <ScheduleStep  currentEvent={event}/>
    </div>
  );
}
