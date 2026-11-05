import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";
import imgWide from "@/assets/images/home/alvaro-palacios-4WIYskwKAV0-unsplash.png";

const highlights = [
  {
    label: "De Basis:",
    title: "Ritme en Fundament",
    body: "Salsa is meer dan alleen pasjes; het is een taal op het ritme van de muziek. We leren je de iconische Clave herkennen, zodat je altijd in de maat danst. Stap voor stap bouwen we je basispassen en eerste draaien uit tot een automatisme, zodat je met vol zelfvertrouwen op de dansvloer staat.",
  },
  {
    label: "Connectie:",
    title: "Dansen zonder woorden",
    body: "Salsa draait om de onzichtbare dialoog tussen partners. Je leert de kunst van het 'leiden' en 'volgen': hoe stuur je met subtiele signalen je partner over de vloer, en hoe reageer je daar als volger op? Deze connectie zorgt ervoor dat je met iedereen kunt dansen alsof je elkaar al jaren kent.",
  },
  {
    label: "De 'Rueda':",
    title: "Energie in de Cirkel",
    body: "De Rueda de Casino is een energieke groepsdans waarbij alle koppels in een cirkel dezelfde figuren uitvoeren. Het is dé manier om de hele groep razendsnel te leren kennen door de constante partnerwissels. De dynamiek en het groepsgevoel in de Rueda zijn onbeschrijfelijk; lachen is gegarandeerd!",
  },
];

export default function HomeCourses() {
  return (
    <div className="bg-black px-page">
      <div className="max-w-7xl py-section mx-auto">
        <div className="grid xl:grid-cols-2 gap-grid mb-10 md:mb-16">
          <div className="flex flex-col justify-between">
            <h2 className="text-3xl md:text-5xl leading-none uppercase text-primary font-title mb-3">
              Jouw eerste stappen in de <br />
              <span className="text-white">Cubaanse Salsa</span>
            </h2>
            <ButtonLink href="/danslessen">Danslessen meer info...</ButtonLink>
          </div>
          <div className="flex flex-col rte leading-normal">
            <h3 className="text-lg text-white mb-1 last:mb-0">
              Wat kun je verwachten?
            </h3>
            <p className="mb-4 last:mb-0">
              In deze cursus nemen we je mee naar de straten van Havana. We
              beginnen bij het absolute begin.
            </p>
            <p className="mt-auto mb-4 last:mb-0">
              Droom je ervan om soepel over de dansvloer te bewegen, maar heb je
              nog nooit een dansschoen aangeraakt? Geen zorgen! Bij onze
              beginnerslessen staat plezier voorop en leer je de basis van de
              &quot;Salsa Casino&quot; op een ontspannen manier.
            </p>
          </div>
        </div>
        <div className="rte grid lg:grid-cols-2 xl:grid-cols-3 gap-grid mb-10 md:mb-16">
          {highlights.map((highlight) => (
            <div
              key={highlight.label}
              className="flex flex-col justify-between border-l border-primary pl-5"
            >
              <div className="flex flex-col mb-5">
                <div className="flex flex-col">
                  <h2 className="text-lg text-white leading-tight mb-4">
                    <span className="block text-primary">
                      {highlight.label}
                    </span>{" "}
                    {highlight.title}
                  </h2>
                  <div className="prose leading-normal">
                    <p>{highlight.body}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="xl:col-span-3">
            <Image
              src={imgWide}
              sizes="(min-width: 1280px) 1216px, (min-width: 1024px) 50vw, 100vw"
              alt="A description of my image."
            />
            <cite className="text-xs text-neutral-700">
              &copy; Alvaro Palacios
            </cite>
          </div>
        </div>
      </div>
    </div>
  );
}
