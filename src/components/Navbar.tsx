"use client";
import { useState, useEffect } from "react";
import { Button, Link as HeroLink } from "@heroui/react"; // Import HeroUI components
import Link from "next/link";
import { eventData } from "@/app/constants/constants";


export default function Navbar({ currentEvent }: { currentEvent: keyof typeof eventData }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {


    const handleScroll = () => {
      setScrolled(window.scrollY > 50); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const eventDetails = eventData[currentEvent];
  if (!eventDetails) {
    return (
      <div className="flex justify-center items-center h-screen text-black font-bold">
        Oops. Este elemento no existe.
      </div>
    );
  }

  const { title, navItems, rsvpMessage, whatsAppNumber } = eventData[currentEvent] || {};
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        scrolled ? "backdrop-blur-lg shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-4xl font-playfair text-white">{title}</h1>

        <ul className="flex gap-6 text-lg font-sans">
          {navItems.map((item) => (
            <li key={item.href}>
              <HeroLink
                as={Link}
                href={item.href}
                className="text-gray-400 hover:text-gray-200"
              >
                {item.label}
              </HeroLink>
            </li>
          ))}
        </ul>

        <Button
          as="a"
          href={`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(rsvpMessage)}`}
          size="sm"
          variant="bordered"
          className="ml-4 text-white hover:text-white/80 transition-colors"
        >
          RSVP
        </Button>
      </div>
    </nav>
  );
}