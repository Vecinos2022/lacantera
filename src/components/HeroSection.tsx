'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Divider } from '@heroui/react';
import { eventData } from '@/app/constants/constants';
import dayjs from 'dayjs';

const HeroSection = ({ currentEvent }: { currentEvent: keyof typeof eventData }) => {
  const eventDetails = eventData[currentEvent];
  
  // Add state to track screen size
  const [isMobile, setIsMobile] = useState(false);
  
  // Effect to check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Standard breakpoint for mobile devices
    };
    
    // Check on initial load
    checkScreenSize();
    
    // Add resize listener
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!eventDetails) {
    return (
      <div className="flex justify-center items-center h-screen text-black font-bold">
        Oops. Este elemento no existe.
      </div>
    );
  }

  const { bannerImage, weddingDate, hero } = eventData[currentEvent] || {};
  
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src={`${bannerImage}`}
        alt="Wedding Background"
        className="object-cover scale-105"
        style={{ filter: "brightness(0.7)" }}
        width={1920}
        height={1080}
      />

      <div className="absolute inset-0 -bottom-64 flex flex-col items-center justify-center text-center">
        {/* Add a semi-transparent backdrop on mobile for better text visibility */}
        {isMobile && (
          <div className="absolute inset-0 z-0"></div>
        )}
        
        {/* Content with conditional text color */}
        <div className={`relative z-10 ${isMobile ? 'text-foreground' : 'text-background'}`}>
          <h1 className="font-playfair text-5xl md:text-7xl font-medium mb-4">{hero.title}</h1>
          <Divider className="w-56 h-1 bg-white mx-auto mb-4" />
          <p className="text-xl md:text-2xl font-playfair">{hero.subtitle}</p>
          <p className="text-xl md:text-2xl font-sans">{dayjs(weddingDate).format('DD.MM.YYYY')}</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
