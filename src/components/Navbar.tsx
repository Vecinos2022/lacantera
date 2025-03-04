"use client";
import { useState, useEffect } from "react";
import { Button, Link as HeroLink } from "@heroui/react"; // Import HeroUI components
import Link from "next/link";


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Change navbar style on scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        scrolled ? "backdrop-blur-lg shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-4xl font-playfair text-white">Jaqueline & Arodi</h1>

       
        <ul className="flex gap-6 text-lg font-sans">
          <li>
            <HeroLink
              as={Link}
              href="#schedule"
              className="text-gray-400 hover:text-gray-200"
            >
              Itinerario
            </HeroLink>
          </li>
          <li>
            <HeroLink
              as={Link}
              href="#contact"
             className="text-gray-400 hover:text-gray-200"
            >
              Detalles
            </HeroLink>
          </li>
        </ul>

  
        <Button
  as="a"
  href={`https://wa.me/6183972791?text=${encodeURIComponent("¡Hola! Me gustaría confirmar mi asistencia a la boda.")}`}
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
