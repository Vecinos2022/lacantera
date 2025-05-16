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
    <section className="flex flex-col justify-center items-center px-10 py-24 " id="schedule">
        <h2 className="text-5xl font-playfair  font-bold text-center mb-12 text-black ">Itinerario del Evento</h2>
      <div className=" grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-6 ">
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
        <div className="h-full">
          <div
            className={cn(
              "relative h-96 w-full overflow-hidden rounded-lg md:h-[500px]",
            )}
          >
            {scheduleData.map((item, index) => (
              <Image
                alt={item.title}
                width={500}
                height={500}
                className={cn(
                                "absolute h-[500] w-full transform-gpu rounded-lg object-cover transition-all duration-300",
                  featureOpen === index ? "scale-100" : "scale-x-50",
                  featureOpen > index ? "translate-y-full" : "",
                )}
                key={item.title}
                src={item.srcImage}
                style={{ zIndex: scheduleData.length - index,
                  objectPosition: "center bottom",
                 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
