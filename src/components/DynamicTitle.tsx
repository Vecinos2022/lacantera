"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

export function useDynamicMetadataTitle() {
  const { eventId } = useParams();
  const eventName = decodeURIComponent(eventId as string); // Decode the URL-encoded string

  return eventName
    ? `${eventName.toUpperCase().replace(/&/g, " & ")}`
    : "Evento";
}

export function DynamicMetadataTitle() {
  const title = useDynamicMetadataTitle();

  useEffect(() => {
    document.title = title;
  }, [title]);

  return null; // No UI needed, just updates <title>
}
