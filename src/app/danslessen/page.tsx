import type { ReactNode } from "react";
import { cacheLife } from "next/cache";
import { FaCalendarCheck } from "react-icons/fa6";
import PageHeader from "@/components/PageHeader";
import { pageMetadata } from "@/lib/metadata";
import { sanityClient } from "@/lib/sanity";

export const metadata = pageMetadata({
  title: "Lessen",
  path: "/danslessen/",
  description:
    "Cubaanse Salsa danslessen in Genk en Zolder voor beginners en half gevorderden. Flexibel lesrooster op maandag, donderdag en zondag. Herhaal gratis je les op meerdere dagen. Ontdek onze unieke lesmethode met nieuwe figuren en uitgebreide herhaling.",
});

const dateFormatter = new Intl.DateTimeFormat("nl-BE", {
  weekday: "short",
  day: "numeric",
  month: "long",
});

function getWeekNumber(date: Date): number {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

const LESSON_DATES_QUERY = `*[_id == "lessonSchedule"][0].dates`;

/** Upcoming lessons from Sanity, grouped by week. Past dates drop off on their own. */
async function getLessonSchedule() {
  "use cache";
  cacheLife("minutes");

  const lessonDates =
    await sanityClient.fetch<string[] | null>(LESSON_DATES_QUERY);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const datesByWeek: Record<string, string[]> = {};
  for (const dateStr of [...new Set(lessonDates)].sort()) {
    const date = new Date(dateStr);
    if (date < today) continue;

    const weekKey = `${date.getFullYear()}-W${getWeekNumber(date)}`;
    (datesByWeek[weekKey] ??= []).push(dateStr);
  }

  return { year: today.getFullYear(), datesByWeek };
}

function formatLessonDate(dateStr: string): string {
  const formatted = dateFormatter.format(new Date(dateStr));
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

type LocationCardProps = {
  days: string;
  name: string;
  address: string;
  routeUrl: string;
  children: ReactNode;
};

function LocationCard({
  days,
  name,
  address,
  routeUrl,
  children,
}: LocationCardProps) {
  return (
    <div className="w-full h-full space-y-px">
      <div className="bg-black text-center rounded-sm p-6">
        <p className="text-xs uppercase mb-1">{days}</p>
        <h3 className="text-2xl text-primary font-semibold font-title">
          {name}
        </h3>
        <p>{address}</p>
        <p>
          <a
            href={routeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-400 underline hover:text-primary transition-colors"
          >
            Google route
          </a>
        </p>
      </div>
      <div className="flex justify-center bg-black text-sm rounded-b-sm font-mono py-3 px-6">
        <div>{children}</div>
      </div>
    </div>
  );
}

export default async function DanslessenPage() {
  const { year, datesByWeek } = await getLessonSchedule();

  return (
    <>
      <PageHeader title="Danslessen" />
      <main>
        <div className="px-page my-section--small">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl text-center leading-none uppercase text-white font-title mb-6">
              Dansles locaties
            </h2>
            <div className="flex flex-col md:flex-row justify-center gap-grid">
              <LocationCard
                days="Maandag"
                name="Casa Papá Giovanni"
                address="Noordlaan 111, Genk"
                routeUrl="https://www.google.com/maps/dir/?api=1&destination=Noordlaan+111+Genk+Belgium"
              >
                <p>19:00 Beginners.</p>
                <p>20:00 Halfgevorderd.</p>
                <p>
                  21:00 Halfgevorderd plus <br />
                  <small className="text-foreground/75">
                    RUEDA BEGINNERS EN FIGUREN
                  </small>
                </p>
                <p>
                  <br />
                </p>
              </LocationCard>
              <LocationCard
                days="Donderdag & zondag"
                name="Dancing Grand Prix"
                address="Sterrenwacht 149, Zolder"
                routeUrl="https://www.google.com/maps/dir/?api=1&destination=Sterrenwacht+147+Zolder+Belgium"
              >
                <p>15u30 beginners.</p>
                <p>16u30 Halfgevorderde.</p>
                <p>
                  17u30 Halfgevorderde plus <br />
                  <small className="text-foreground/75">
                    RUEDA BEGINNERS EN FIGUREN
                  </small>
                </p>
                <p>
                  18u30 Bachata Sensual beginners. <br />
                  <small className="text-foreground/75">
                    BACHATA IS ENKEL OP ZONDAG
                  </small>
                </p>
              </LocationCard>
            </div>
            <div className="mt-10">
              <h2 className="text-2xl md:text-3xl text-center leading-none uppercase text-white font-title mb-6">
                Extra info
              </h2>
              <div className="text-center">
                <div className="text-xl text-foreground/50">
                  --- Les van zondag 13 September is verplaatst naar zondag 15
                  November --- <br />
                  --- Les van zondag 18 oktober is verplaatst naar zondag 22
                  November --- <br />
                  --- Zondag 13 September en zondag 18 Oktober geen social
                  dansavond. ---
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-page my-section--small">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl text-center leading-none uppercase text-white font-title mb-6">
              Lesdata {year}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-grid">
              {Object.entries(datesByWeek).map(([weekKey, weekDates]) => (
                <div key={weekKey}>
                  <h3 className="text-lg font-semibold font-title border-b border-white/50 mb-2">
                    Week {weekKey.split("-W")[1]}
                  </h3>
                  <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-5 md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-neutral-600 before:to-transparent">
                    {weekDates.map((dateStr) => (
                      <div key={dateStr} className="relative">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center md:space-x-reverse">
                            <div className="flex items-center justify-center bg-background w-10 h-10 rounded-full md:order-1">
                              <FaCalendarCheck className="text-primary" />
                            </div>
                          </div>
                          <div>
                            <h2 className="font-title mt-1">
                              {formatLessonDate(dateStr)}
                            </h2>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-black px-page py-section">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4 flex flex-col md:flex-row md:items-center font-title">
              <span className="mr-2">💃</span>
              <span className="mr-2">Haal alles uit je danslessen:</span>
              <span className="inline-block text-primary">
                Flexibiliteit &amp; Herhaling
              </span>
            </h3>

            <p className="mb-4 last:mb-0">
              Bij ons staat kwaliteit en dansplezier voorop. Daarom hanteren wij
              een uniek lesconcept waarmee je de Cubaanse Salsa écht onder de
              knie krijgt, op jouw eigen tempo.
            </p>

            <h3 className="text-xl font-semibold font-title mb-4">
              Nieuwe figuren op maandag
            </h3>

            <p className="mb-4 last:mb-0">
              Elke week starten we de nieuwe lescyclus op{" "}
              <span className="text-primary">maandag</span>. Tijdens deze les
              introduceren we een gloednieuw figuur of een nieuwe combinatie. We
              nemen uitgebreid de tijd om de techniek en de &apos;sabor&apos;
              van dit nieuwe figuur aan te leren.
            </p>

            <h3 className="text-xl font-semibold font-title mb-4">
              Extra oefenen? Herhaal je les op donderdag of zondag!
            </h3>

            <p className="mb-4 last:mb-0">
              Heb je de smaak te pakken of wil je die nieuwe draai nog even
              extra oefenen? Dat kan! Op{" "}
              <span className="text-primary">donderdag</span> en{" "}
              <span className="text-primary">zondag</span> geven we exact
              dezelfde les als op maandag.
            </p>

            <ul className="list-disc space-y-2 pl-4 mb-4 last:mb-0">
              <li>
                <span className="text-primary">Geen verplichting:</span> Je
                kiest zelf of je één, twee of drie keer per week komt.
              </li>
              <li>
                <span className="text-primary">Geen extra kosten:</span> Je
                betaalt per lessenreeks, dus extra herhalen is een cadeautje van
                ons aan jou!
              </li>
            </ul>

            <h3 className="text-xl font-semibold font-title mb-4">
              Eerst herhalen, dan verdiepen
            </h3>

            <p className="mb-4 last:mb-0">
              We vallen niet zomaar met de deur in huis. Voordat we aan het
              nieuwe figuur van de week beginnen, herhalen we altijd kort de
              figuren van de voorgaande weken. Zo zorgen we ervoor dat de hele
              reeks fris in je geheugen blijft en je met een zelfverzekerd
              gevoel de dansvloer op gaat.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
