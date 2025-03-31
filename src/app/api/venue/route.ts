import { NextResponse } from "next/server";

// Datos locales de eventos
const venues = {
  "Jaqueline&Arodi": {
    name: "La Cantera",

    date: "03.05.2025",
    time: "7:00 PM",
    location: "Puente Carretera a Parral 1616 Los Arcos, 34935 Durango, Dgo.",
    mapUrl: "https://maps.app.goo.gl/3JhE5LZTd5UbuCM3A",
    image: "/LaCantera.png",
  },
  "Rodrigo&Julieta": {
    name: "Jardín Esmeralda",

    date: "10.06.2025",
    time: "6:30 PM",
    location: "Av. Principal 123, Zona Dorada, 34000 Durango, Dgo.",
    mapUrl: "https://maps.app.goo.gl/xYZ123456789",
    image: "/LaCantera.png",
  },
};

// Manejo de la solicitud GET
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("id") as keyof typeof venues;

  if (!eventId || !venues[eventId]) {
    return NextResponse.json(
      { error: "Evento no encontrado" },
      { status: 404 },
    );
  }

  return NextResponse.json(venues[eventId]);
}
