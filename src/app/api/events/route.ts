import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb";
import { EventModel } from "@/models/Event";

export async function GET(req: Request) {
  await connect();

  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("id");

  if (eventId) {
    // Fetch a specific event by ID
    const event = await EventModel.findOne({ eventId }).lean();

    if (!event) {
      return NextResponse.json(
        { error: "Evento no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(event);
  }

  // Fetch all events
  const events = await EventModel.find().lean();
  return NextResponse.json(events);
}

export async function POST(req: Request) {
  await connect();

  try {
    const body = await req.json();
    const newEvent = new EventModel(body);
    await newEvent.save();

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear el evento", message: error },
      { status: 500 },
    );
  }
}
