"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import Image from "next/image";

// Definir la estructura de los datos del evento
interface VenueData {
  name: string;
  date: string;
  time: string;
  location: string;
  mapUrl: string;
  image: string;
}

export function VenueDetails() {
  const { eventId } = useParams(); // Obtiene el eventId de la URL
  const [venue, setVenue] = useState<VenueData | null>(null);

  useEffect(() => {
    const fetchVenueData = async () => {
      try {
        const res = await fetch(`/api/venue?id=${eventId}`);
        if (!res.ok) throw new Error("Evento no encontrado");

        const data: VenueData = await res.json();
        setVenue(data);
      } catch (error) {
        console.error("Error al obtener los detalles del evento:", error);
      }
    };

    if (eventId) fetchVenueData();
  }, [eventId]);

  if (!venue) {
    return (
      <div className="text-center text-white p-10">
        <p className="text-2xl font-semibold">
          Cargando detalles del evento...
        </p>
      </div>
    );
  }

  return (
    <section
      id="details"
      className="relative min-h-[600px] overflow-hidden rounded-md mx-10"
    >
      {/* Imagen de fondo */}
      <Image
        src={venue.image}
        alt="Wedding Venue"
        className="object-cover brightness-75 rounded-md"
        fill
        priority
      />

      {/* Contenido del evento */}
      <div className="flex flex-col justify-center items-center relative container py-24">
        <h2 className="text-center font-serif text-4xl mb-12 text-white">
          Detalles del Evento
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Fecha */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex items-center gap-3 pb-2">
              <CalendarDays className="h-6 w-6 text-gold-200" />
              <h3 className="font-serif text-xl text-gold-200">Fecha</h3>
            </CardHeader>
            <CardBody className="text-center text-white">
              <p className="text-lg font-medium font-geistSans">{venue.date}</p>
            </CardBody>
          </Card>

          {/* Hora */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex items-center gap-3 pb-2">
              <Clock className="h-6 w-6 text-gold-200" />
              <h3 className="font-serif text-xl text-gold-200">Hora</h3>
            </CardHeader>
            <CardBody className="text-center text-white">
              <p className="text-lg font-medium font-geistSans">{venue.time}</p>
            </CardBody>
          </Card>

          {/* Ubicación */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex items-center gap-3 pb-2">
              <MapPin className="h-6 w-6 text-gold-200" />
              <h3 className="font-serif text-xl text-gold-200">Ubicación</h3>
            </CardHeader>
            <CardBody className="text-center text-white space-y-3">
              <p className="text-lg font-medium font-geistSans">{venue.name}</p>
              <p className="text-sm text-gold-200 font-geistSans">
                {venue.location}
              </p>
              <Button
                variant="bordered"
                className="bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-sm"
                onClick={() => window.open(venue.mapUrl, "_blank")}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Ver en Mapa
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}
