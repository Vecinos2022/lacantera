"use client";
import { useState, useEffect } from "react";
import { Button, Link as HeroLink } from "@heroui/react"; // Import HeroUI components
import Link from "next/link";
import { eventData } from "@/app/constants/constants";
import { Menu, X } from "lucide-react"; 

export default function Navbar({ currentEvent }: { currentEvent: keyof typeof eventData }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!eventData[currentEvent]) {
    return (
      <div className="flex justify-center items-center h-screen text-black font-bold">
        Oops. Este elemento no existe.
      </div>
    );
  }

  const { title, navItems, rsvpMessage, whatsAppNumber } = eventData[currentEvent] || {};

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        scrolled || mobileMenuOpen ? "backdrop-blur-lg shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Title/Logo - Always visible */}
        <h1 className="text-4xl font-playfair text-white">{title}</h1>

        {/* Desktop Navigation - Hidden on mobile */}
        <ul className="hidden md:flex gap-6 text-lg font-sans">
          {navItems.map((item) => (
            <li key={item.href}>
              <HeroLink
                as={Link}
                href={item.href}
                className="text-background hover:text-gray-200"
              >
                {item.label}
              </HeroLink>
            </li>
          ))}
        </ul>

        {/* RSVP Button - Hidden on mobile */}
        <Button
          as="a"
          href={`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(rsvpMessage)}`}
          size="sm"
          variant="bordered"
          className="hidden md:flex ml-4 text-background hover:text-white/80 transition-colors"
        >
          RSVP
        </Button>

        {/* Mobile Menu Button - Only visible on mobile */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu - Only visible when open */}
      {mobileMenuOpen && (
        <div className="md:hidden  backdrop-blur-md">
          <div className="container mx-auto px-6 py-4">
            <ul className="flex flex-col space-y-4 mb-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <HeroLink
                    as={Link}
                    href={item.href}
                    className="text-white hover:text-gray-300 block py-2"
                    onClick={handleLinkClick}
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
              className="w-full text-white hover:text-white/80 transition-colors"
              onClick={handleLinkClick}
            >
              RSVP
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}