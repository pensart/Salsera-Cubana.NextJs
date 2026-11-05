import type { PortableTextBlock } from "@portabletext/react";
import { cacheLife } from "next/cache";
import { sanityClient } from "@/lib/sanity";

export type EventDate = {
  start: string;
  end: string | null;
};

export type SiteEvent = {
  _id: string;
  title: string;
  eventType: string | null;
  summary: string | null;
  /** Only the dates still to come, soonest first. Always holds at least one. */
  dates: EventDate[];
  location: { name: string | null; address: string | null } | null;
  price: string | null;
  cover: { url: string; width: number; height: number; alt: string } | null;
  description: PortableTextBlock[] | null;
  registrationUrl: string | null;
  facebookUrl: string | null;
};

const UPCOMING_EVENTS_QUERY = `*[_type == "event" && count(dates[dateTime(coalesce(end, start)) >= dateTime($now)]) > 0]{
  _id,
  title,
  eventType,
  summary,
  dates[]{ start, end },
  location{ name, address },
  price,
  "cover": cover{
    alt,
    "url": asset->url,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height
  },
  description,
  registrationUrl,
  facebookUrl
}`;

const timeOf = (value: string) => new Date(value).getTime();

/** Events that still have a date to come, with the next one first. */
export async function getUpcomingEvents(): Promise<SiteEvent[]> {
  "use cache";
  cacheLife("minutes");

  const now = new Date();
  const events = await sanityClient.fetch<SiteEvent[]>(UPCOMING_EVENTS_QUERY, {
    now: now.toISOString(),
  });

  return events
    .map((event) => ({
      ...event,
      dates: event.dates
        .filter((date) => timeOf(date.end ?? date.start) >= now.getTime())
        .sort((a, b) => timeOf(a.start) - timeOf(b.start)),
    }))
    .sort((a, b) => timeOf(a.dates[0].start) - timeOf(b.dates[0].start));
}
