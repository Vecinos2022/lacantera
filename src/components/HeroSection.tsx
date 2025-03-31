"use client";
import React from "react";
import Image from "next/image";
import { Divider } from "@heroui/react";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src="/wedding-bg.png"
        alt="Wedding Background"
        className="object-cover scale-105"
        style={{ filter: "brightness(0.7) " }}
        width={1920}
        height={1080}
      />

      <div className="absolute  inset-0 -bottom-64 flex flex-col items-center justify-center text-center text-white">
        {/* <div className="absolute inset-0 -bottom-64 w-screen h-[400px]  bg-white/20 mx-auto" /> */}
        <h1 className="font-playfair text-5xl md:text-7xl font-medium mb-4  ">
          ¡Nos Casamos!
        </h1>
        <Divider className="w-56 h-1 bg-white mx-auto mb-4" />
        <p className="text-xl md:text-2xl font-playfair">
          Te esperamos en nuestro día especial
        </p>
        <p className="text-xl md:text-2xl font-sans">03.05.2025</p>
      </div>
    </section>
  );
};

export default HeroSection;
