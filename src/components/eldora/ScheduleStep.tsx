"use client";

import { useEffect, useState } from "react";

import { cn } from "@heroui/react";
import { TextComponent } from "./FeatureFour";
import { eventData } from "@/app/constants/constants";
import Image from "next/image";


export default function ScheduleStep({ currentEvent }: { currentEvent: keyof typeof eventData }) {

    const eventDetails = eventData[currentEvent];
  
  
    const { scheduleData } = eventData[currentEvent] || {};
  const [featureOpen, setFeatureOpen] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 10);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer > 10000) {
      setFeatureOpen((prev) => {
        const nextIndex = prev + 1;
        // If we've reached the end, go back to the first item
        return nextIndex >= scheduleData.length ? 0 : nextIndex;
      });
      setTimer(0);
    }
  }, [timer, scheduleData]);
  if (!eventDetails) {
    return (
      <div className="flex justify-center items-center h-screen text-black font-bold">
        Oops. Este elemento no existe.
      </div>
    );
  }
  return (
    <section className="flex flex-col justify-center items-center px-4 md:px-10 py-16 md:py-24" id="schedule">
      <h2 className="text-3xl md:text-5xl font-playfair font-bold text-center mb-8 md:mb-12 text-black">
        Itinerario del Evento
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
        <div className="space-y-4 md:space-y-6">
          {scheduleData.map((item, index) => (
            <button
              aria-label={item.title}
              className="w-full"
              key={item.title}
              onClick={() => {
                setFeatureOpen(index);
                setTimer(0);
              }}
              type="button"
            >
              <TextComponent
                content={item.content}
                isOpen={featureOpen === index}
                loadingWidthPercent={featureOpen === index ? timer / 100 : 0}
                number={index + 1}
                title={item.title}
              />
            </button>
          ))}
        </div>
        
        {/* Image container */}
        <div className="mt-6 md:mt-0">
          <div
            className={cn(
              "relative h-80 md:h-96 lg:h-[500px] w-full overflow-hidden rounded-lg"
            )}
          >
            {/* Mobile view - vertical layout */}
            <div className="md:hidden block h-full">
              {scheduleData.map((item, index) => (
                <div 
                  key={`mobile-${item.title}`}
                  className={cn(
                    "absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out",
                    featureOpen === index 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-full"
                  )}
                >
                  <Image
                    alt={item.title}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover rounded-lg"
                    src={item.srcImage}
                    style={{ 
                      objectPosition: "center top" 
                    }}
                  />
                </div>
              ))}
            </div>
            
            {/* Desktop view - stacked images with animations */}
            <div className="hidden md:block relative h-full w-full">
              {scheduleData.map((item, index) => (
                <Image
                  alt={item.title}
                  width={500}
                  height={500}
                  className={cn(
                    "absolute h-full w-full transform-gpu rounded-lg object-cover transition-all duration-300",
                    featureOpen === index ? "scale-100" : "scale-95 opacity-30",
                    featureOpen > index ? "translate-y-full" : "",
                  )}
                  key={`desktop-${item.title}`}
                  src={item.srcImage}
                  style={{ 
                    zIndex: scheduleData.length - index,
                    objectPosition: "center top",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
