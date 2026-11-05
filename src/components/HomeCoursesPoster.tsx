import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";
import { getUpcomingEvents } from "@/lib/events";

/** Shows the cover of the next event. The section disappears when none is planned. */
export default async function HomeCoursesPoster() {
  const [nextEvent] = await getUpcomingEvents();

  if (!nextEvent?.cover) return null;

  return (
    <div className="px-page">
      <div className="max-w-7xl py-section mx-auto">
        <div className="flex items-center justify-center">
          <Image
            src={nextEvent.cover.url}
            width={nextEvent.cover.width}
            height={nextEvent.cover.height}
            sizes="(min-width: 640px) 576px, 100vw"
            className="w-full max-w-xl"
            alt={nextEvent.cover.alt}
          />
        </div>
        <ButtonLink href="/evenementen" className="mt-10 mx-auto">
          Evenementen meer info...
        </ButtonLink>
      </div>
    </div>
  );
}
