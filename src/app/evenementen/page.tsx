import EventCard from "@/components/EventCard";
import PageHeader from "@/components/PageHeader";
import { getUpcomingEvents } from "@/lib/events";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Evenementen",
  path: "/evenementen/",
  description:
    "Op zoek naar een Salsa party in Limburg? Ontdek de evenementenkalender van Salsera Cubana. Van maandelijkse dansavonden tot speciale workshops in Genk en Zolder. De ideale plek om Cubaanse Salsa in de praktijk te brengen!",
});

export default async function EvenementenPage() {
  const events = await getUpcomingEvents();

  return (
    <>
      <PageHeader title="Evenementen" />
      <main>
        <div className="px-page my-section--small">
          <div className="max-w-7xl mx-auto">
            {events.length > 0 ? (
              <div className="flex flex-col divide-y divide-foreground/20">
                {events.map((event, index) => (
                  <EventCard
                    key={event._id}
                    event={event}
                    isFirst={index === 0}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-lg py-12">
                Er zijn momenteel geen evenementen gepland.
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
