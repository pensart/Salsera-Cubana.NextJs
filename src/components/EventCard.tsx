import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { FaCalendarDays, FaLocationDot, FaTicket } from "react-icons/fa6";
import ButtonLink from "@/components/ButtonLink";
import type { EventDate, SiteEvent } from "@/lib/events";

const dateTimeFormat = (options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("nl-BE", { ...options, timeZone: "Europe/Brussels" });

const dayFormat = dateTimeFormat({ day: "numeric" });
const monthFormat = dateTimeFormat({ month: "long" });
const yearFormat = dateTimeFormat({ year: "numeric" });
const dateFormat = dateTimeFormat({
  weekday: "short",
  day: "numeric",
  month: "long",
});
const timeFormat = dateTimeFormat({ hour: "2-digit", minute: "2-digit" });

function formatEventDate({ start, end }: EventDate): string {
  const date = dateFormat.format(new Date(start));
  const time = timeFormat.format(new Date(start));
  const label = date.charAt(0).toUpperCase() + date.slice(1);

  return end
    ? `${label}, ${time} – ${timeFormat.format(new Date(end))}`
    : `${label}, ${time}`;
}

const descriptionComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
    h3: ({ children }) => (
      <h3 className="text-lg font-bold text-white/80 leading-tight mb-4">
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="flex flex-wrap gap-3 mb-4 last:mb-0">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-primary transition-colors"
      >
        {children}
      </a>
    ),
  },
};

type EventDetailProps = {
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
};

function EventDetail({ icon: Icon, children }: EventDetailProps) {
  return (
    <div className="flex gap-3">
      <Icon className="text-primary mt-1 shrink-0" />
      <div>{children}</div>
    </div>
  );
}

type EventCardProps = {
  event: SiteEvent;
  /** The first card is above the fold, so its cover shouldn't load lazily. */
  isFirst: boolean;
};

export default function EventCard({ event, isFirst }: EventCardProps) {
  const nextDate = new Date(event.dates[0].start);
  const day = dayFormat.format(nextDate);
  const month = monthFormat.format(nextDate);
  const year = yearFormat.format(nextDate);
  const { location } = event;

  return (
    <div className="flex flex-col sm:flex-row items-start gap-grid even:bg-black py-12 px-8">
      <div className="hidden shrink-0 lg:flex items-center justify-center min-w-16">
        <div className="flex flex-col items-center justify-center">
          <div className="text-4xl font-bold">{day}</div>
          <div>{month}</div>
          <div>{year}</div>
        </div>
      </div>
      <div className="w-full sm:w-auto shrink-0">
        <p className="lg:hidden text-xl text-white font-bold mb-4">
          {day} {month} {year}
        </p>

        {event.cover && (
          <Image
            src={event.cover.url}
            width={event.cover.width}
            height={event.cover.height}
            sizes="(min-width: 640px) 288px, 100vw"
            loading={isFirst ? "eager" : "lazy"}
            className="w-full sm:w-72"
            alt={event.cover.alt}
          />
        )}
      </div>
      <div>
        {event.eventType && (
          <p className="text-xs uppercase mb-1">{event.eventType}</p>
        )}
        <h2 className="text-xl font-bold text-white leading-tight mb-1">
          {event.title}
        </h2>
        {event.summary && (
          <p className="text-lg font-bold text-white/80 leading-tight mb-4">
            {event.summary}
          </p>
        )}

        <div className="space-y-3 mb-6">
          <EventDetail icon={FaCalendarDays}>
            <ul>
              {event.dates.map((date) => (
                <li key={date.start}>{formatEventDate(date)}</li>
              ))}
            </ul>
          </EventDetail>
          {location?.name && (
            <EventDetail icon={FaLocationDot}>
              <p>{location.name}</p>
              {location.address && (
                <>
                  <p>{location.address}</p>
                  <p>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-neutral-400 underline hover:text-primary transition-colors"
                    >
                      Google route
                    </a>
                  </p>
                </>
              )}
            </EventDetail>
          )}
          {event.price && (
            <EventDetail icon={FaTicket}>{event.price}</EventDetail>
          )}
        </div>

        <div className="leading-relaxed">
          {event.description && (
            <PortableText
              value={event.description}
              components={descriptionComponents}
            />
          )}
          {(event.registrationUrl || event.facebookUrl) && (
            <div className="flex flex-wrap gap-3 mt-4">
              {event.registrationUrl && (
                <ButtonLink href={event.registrationUrl} external>
                  Inschrijven
                </ButtonLink>
              )}
              {event.facebookUrl && (
                <ButtonLink href={event.facebookUrl} external>
                  Facebook event
                </ButtonLink>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
