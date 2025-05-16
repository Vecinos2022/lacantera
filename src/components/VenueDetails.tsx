import { CalendarDays, Clock, MapPin } from "lucide-react"
import { Button } from "@heroui/react"
import { Card, CardBody, CardHeader } from "@heroui/react"
import Image from "next/image"
import { eventData } from "@/app/constants/constants"
import dayjs from "dayjs"

export function VenueDetails({ currentEvent }: { currentEvent: keyof typeof eventData }) {
  const eventDetails = eventData[currentEvent];
  const { weddingDate } = eventData[currentEvent] || {};

  if (!eventDetails) {
    return (
      <div className="flex justify-center items-center h-screen text-black font-bold">
        Oops. Este elemento no existe.
      </div>
    );
  }
  
  return (
    <section id="details" className="relative min-h-[600px] overflow-hidden rounded-md mx-0 md:mx-10">
      {/* Background Image */}
      <Image src="/LaCantera.png" alt="Wedding Venue" className="object-cover brightness-75 rounded-md" fill priority />

      {/* Content Overlay */}
      <div className="flex flex-col justify-center items-center relative container px-4 md:px-8 py-24">
        <h2 className="flex justify-center text-center font-serif text-4xl mb-8 md:mb-12 text-white">Detalles del Evento</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full md:max-w-5xl mx-auto">
          {/* Date Card */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 w-full">
            <CardHeader className="flex items-center gap-3 pb-2">
              <div className="flex items-center">
                <CalendarDays className="h-6 w-6 text-background" />
              </div>
              <h3 className="font-serif text-xl text-background">Fecha</h3>
            </CardHeader>
            <CardBody className="text-center text-white">
              <p className="text-lg font-medium font-geistSans">{dayjs(weddingDate).format('DD.MM.YYYY')}</p>
            </CardBody>
          </Card>

          {/* Time Card */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 w-full">
            <CardHeader className="flex items-center gap-3 pb-2">
              <div className="flex items-center">
                <Clock className="h-6 w-6 text-background" />
              </div>
              <h3 className="font-serif text-xl text-background">Hora</h3>
            </CardHeader>
            <CardBody className="text-center text-white">
              <p className="text-lg font-medium font-geistSans">{dayjs(weddingDate).format('hh:mm a')}</p>
            </CardBody>
          </Card>

          {/* Location Card */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 w-full">
            <CardHeader className="flex items-center gap-3 pb-2">
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-background" />
              </div>
              <h3 className="font-serif text-xl text-background">Ubicación</h3>
            </CardHeader>
            <CardBody className="text-center text-white space-y-3">
              <div>
                <p className="text-lg font-medium font-geistSans">La Cantera</p>
                <p className="text-sm text-background font-geistSans">Puente Carretera a Parral 1616 Los Arcos, 34935 Durango, Dgo.</p>
              </div>
              <Button
                variant="bordered"
                className="bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-sm"
                onClick={() => window.open("https://maps.app.goo.gl/3JhE5LZTd5UbuCM3A", "_blank")}
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

