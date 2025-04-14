'use client';
import React from 'react';
import { eventData } from '@/app/constants/constants';

const Quote = ({ currentEvent }: { currentEvent: keyof typeof eventData }) => {
  const eventDetails = eventData[currentEvent];
  const quote = eventDetails?.quote || ""; // Ensure quote is always a string

  if (!eventDetails || !quote.trim()) {
    return null; // Return nothing if eventDetails or quote is invalid
  }

  return (
    <section className="flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-b from-white to-gray-100">
      <blockquote className="text-center text-2xl md:text-4xl italic font-playfair text-gray-700 leading-relaxed max-w-4xl">
        <p className="indent-8 mb-4">{`"${quote}"`}</p>
      </blockquote>
    </section>
  );
};

export default Quote;
