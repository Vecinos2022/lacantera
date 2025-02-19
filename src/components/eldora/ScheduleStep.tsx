"use client";

import { useEffect, useState } from "react";

import { cn } from "@heroui/react";
import { TextComponent } from "./FeatureFour";

const data = [
  {
    title: "Ceremonia Religiosa",
    content:
      "Centro de Eventos y Convenciones La Cantera. a las 18:00 hrs.",
    srcImage:
      "/schedule/ceremony.png",
  },
  {
    title: "Coctelería",
    content:
      "Centro de Eventos y Convenciones La Cantera. a las 19:30 hrs.",
    srcImage:
      "/schedule/cocktail.png",
  },
  {
    title: "Recepción",
    content:
      "Centro de Eventos y Convenciones La Cantera. a las 21:00 hrs.",
    srcImage:
      "/schedule/reception.png",
  }

];

export default function ScheduleStep() {
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
      setFeatureOpen((prev) => (prev + 1) % data.length);
      setTimer(0);
    }
  }, [timer]);

  return (
    <section className="flex flex-col justify-center items-center px-10 py-24 " id="schedule">
        <h2 className="text-5xl font-playfair  font-bold text-center mb-12 text-black ">Itinerario del Evento</h2>
      <div className=" grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-6 ">
          {data.map((item, index) => (
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
            {data.map((item, index) => (
              <img
                alt={item.title}
                className={cn(
                  "absolute h-[500px] w-full transform-gpu rounded-lg object-cover transition-all duration-300",
                  featureOpen === index ? "scale-100" : "scale-70",
                  featureOpen > index ? "translate-y-full" : "",
                )}
                key={item.title}
                src={item.srcImage}
                style={{ zIndex: data.length - index }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
