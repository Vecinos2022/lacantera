'use client'
import { eventData } from '@/app/constants/constants';
import { Card, Button } from '@heroui/react';
import dayjs from 'dayjs';
import React from 'react'
import { useEffect, useState } from "react";
import 'dayjs/locale/es';
dayjs.locale('es');
const Countdown = ({ currentEvent }: { currentEvent: keyof typeof eventData }) => {

  const eventDetails = eventData[currentEvent];


  const { weddingDate, whatsAppNumber, countdown, rsvpMessage } = eventData[currentEvent] || {};

  function formatWeddingDate(weddingDate: Date): string {
    return dayjs(weddingDate)
      .format('dddd D [de] MMMM, YYYY')
      .replace(/^\w/, (c) => c.toUpperCase()) // Capitalize the first letter of the day
      .replace(/ de (\w)/, (match, p1) => ` de ${p1.toUpperCase()}`); // Capitalize the first letter of the month
  }
  
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      })
    
      useEffect(() => {
        const timer = setInterval(() => {
          const now = new Date()
          const difference = weddingDate.getTime() - now.getTime()
    
          if (difference <= 0) {
            clearInterval(timer)
            return
          }
    
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          })
        }, 1000)
    
        return () => clearInterval(timer)
      }, [weddingDate])

      if (!eventDetails) {
        return (
          <div className="flex justify-center items-center h-screen text-black font-bold">
            Oops. Este elemento no existe.
          </div>
        );
      }
  return (     
    <section className="relative mt-[-60px] pt-32 pb-16 bg-gradient-to-b from-transparent via-gray-200 to-gray-100 flex flex-col items-center justify-center  p-8 text-center">
    <h1 className="text-5xl font-playfair font-bold text-black">{countdown.title}</h1>
    
    <p className="text-lg mt-4 py-4 text-black">{formatWeddingDate(weddingDate)}</p>


    <div className="container flex flex-col items-center text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <TimeCard value={timeLeft.days} label="Días" />
          <TimeCard value={timeLeft.hours} label="Horas" />
          <TimeCard value={timeLeft.minutes} label="Minutos" />
          <TimeCard value={timeLeft.seconds} label="Segundos" />
        </div>
      </div>

    <div className="mt-6 flex flex-col sm:flex-row gap-4">
      <Button
        as="a"
        href={`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(`${rsvpMessage}`)}`}
        color='warning'
        variant="bordered"
        className="w-full sm:w-auto text-black transition-colors"
      >
        {countdown.cta}
      </Button>
      <Button
        as="a"
        href={`tel:+${whatsAppNumber}`}
        variant='bordered'
        className="w-full sm:w-auto border-black text-black px-6 py-3 rounded-lg font-sans"
      >
        {countdown.cta2} 
      </Button>
    </div>
  </section>)
}

export default Countdown
function TimeCard({ value, label }: { value: number; label: string }) {
    return (
      <Card className="p-4 bg-gold-500/10 border-gold-500/20 text-black">
        <div className="text-4xl md:text-5xl font-bold font-serif">{value}</div>
        <div className="text-sm pt-2 font-sans">{label}</div>
      </Card>
    )
  }