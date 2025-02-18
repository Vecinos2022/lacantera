import { CalendarDays, Clock, MapPin } from "lucide-react"
import { Button } from "@heroui/react"
import { Card, CardBody, CardHeader } from "@heroui/react"
import Image from "next/image"

export function VenueDetails() {
  return (
    <section id="details" className="relative min-h-[600px] overflow-hidden rounded-md mx-10">
    {/* Background Image */}
    <Image src="/LaCantera.png" alt="Wedding Venue" className="object-cover brightness-75 rounded-md" fill priority />

      {/* Content Overlay */}
      <div className="flex flex-col justify-center items-center relative container py-24">

        <h2 className="flex justify-center text-center font-serif text-4xl mb-12 text-white">Detalles del Evento</h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Date Card */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex items-center gap-3 pb-2">
              <div className="flex items-center">
                <CalendarDays className="h-6 w-6 text-gold-200" />
              </div>
              <h3 className="font-serif text-xl text-gold-200">Fecha</h3>
            </CardHeader>
            <CardBody className="text-center text-white">
              <p className="text-lg font-medium font-geistSans">03.05.2025</p>
            </CardBody>
          </Card>

          {/* Time Card */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex items-center gap-3 pb-2">
              <div className="flex items-center">
                <Clock className="h-6 w-6 text-gold-200" />
              </div>
              <h3 className="font-serif text-xl text-gold-200">Hora</h3>
            </CardHeader>
            <CardBody className="text-center text-white">
              <p className="text-lg font-medium font-geistSans">6:00 PM</p>
            </CardBody>
          </Card>

          {/* Location Card */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="flex items-center gap-3 pb-2">
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-gold-200" />
              </div>
              <h3 className="font-serif text-xl text-gold-200">Ubicación</h3>
            </CardHeader>
            <CardBody className="text-center text-white space-y-3">
              <div>
                <p className="text-lg font-medium font-geistSans">La Cantera</p>
                <p className="text-sm text-gold-200 font-geistSans">Puente Carretera a Parral 1616 Los Arcos, 34935 Durango, Dgo.y</p>
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
  )
}

