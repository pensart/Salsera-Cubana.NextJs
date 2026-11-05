import Image from "next/image";
import imgProfile from "@/assets/images/contact/tamara-colombat.jpg";

const contactOptions = [
  {
    title: "E-mail",
    href: "mailto:tamaracolombat@icloud.com",
    label: "tamaracolombat@icloud.com",
  },
  {
    title: "Telefoon",
    href: "tel:+32477722284",
    label: "+32 (0)477 72 22 84",
  },
  {
    title: "WhatsApp",
    href: "https://wa.me/32477722284",
    label: "Conversatie starten",
  },
];

export default function LayoutContact() {
  return (
    <div className="mt-12 md:mt-0 px-page">
      <h2 className="sr-only">Contact</h2>
      <div className="my-section py-section">
        <div className="lg:py-6 xl:py-0">
          <div className="relative rounded-xs bg-linear-115 from-primary from-20% via-primary/60 via-60% to-primary/30 sm:bg-linear-145 max-w-7xl mx-auto">
            <div className="relative p-6 lg:p-8">
              <div className="mx-auto max-w-2xl lg:max-w-5xl">
                <div className="grid grid-cols-1 lg:grid-cols-[384px_1fr_1fr]">
                  <div className="-mt-16">
                    <div className="-m-2 rounded-xs bg-background/15 shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-foreground/5 max-lg:mx-auto max-lg:max-w-xs">
                      <div className="rounded-xs p-2 shadow-md shadow-foreground/5">
                        <div className="overflow-hidden rounded-xs shadow-2xl outline -outline-offset-1 outline-foreground/10">
                          <Image
                            src={imgProfile}
                            sizes="(min-width: 1024px) 384px, 320px"
                            alt="Tamara Colombat"
                          />
                        </div>
                      </div>
                    </div>
                    <h2 className="text-3xl md:text-5xl leading-none uppercase text-white font-title mt-8 mb-4">
                      Tamara Colombat
                    </h2>
                  </div>
                  <div className="flex flex-col lg:col-span-2 lg:px-16">
                    <p className="mb-4 last:mb-0">
                      Tamara is een gepassioneerde danseres afkomstig uit
                      Santiago de Cuba, waar dans en muziek een essentieel deel
                      zijn van het dagelijks leven. Al van jongs af aan is ze
                      omringd door ritme en beweging, wat haar een natuurlijke
                      en authentieke stijl heeft gegeven.
                    </p>
                    <p className="mb-4 last:mb-0">
                      Met jarenlange ervaring in onder andere Salsa Cubana,
                      Salsa Suelta en Rueda de Casino, deelt ze haar kennis en
                      energie met veel enthousiasme in haar lessen. Haar aanpak
                      is toegankelijk, warm en motiverend, waardoor zowel
                      beginners als gevorderden zich snel op hun gemak voelen.
                    </p>
                    <p className="mb-4 last:mb-0">
                      Tamara gelooft dat dans niet alleen techniek is, maar
                      vooral plezier, connectie en expressie. In haar lessen
                      staat het genieten van de muziek en het samen dansen
                      centraal.
                    </p>
                    <p className="mb-4 last:mb-0">
                      Met haar aanstekelijke enthousiasme en natuurlijke manier
                      van lesgeven laat Tamara je niet alleen dansen, maar écht
                      genieten. Voor je het weet, beweeg je met zelfvertrouwen
                      op de muziek en wil je niet meer stoppen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative py-12 lg:py-0 lg:translate-y-1/2 px-6 lg:px-8 -mt-6">
              <div className="mx-auto max-w-2xl lg:max-w-6xl">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 text-center">
                  {contactOptions.map((option) => (
                    <div
                      key={option.title}
                      className="-m-2 grid grid-cols-1 rounded-xs shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-foreground/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md"
                    >
                      <div className="grid grid-cols-1 rounded-xs p-2 shadow-md shadow-foreground/5">
                        <div className="rounded-xs bg-background p-5 shadow-2xl ring-1 ring-foreground/5">
                          <h3 className="mb-2 text-lg text-primary font-medium tracking-tight">
                            {option.title}
                          </h3>
                          <p className="my-2 text-base/6 first:mt-0 last:mb-0">
                            <a
                              href={option.href}
                              className="underline hover:text-primary transition-colors"
                            >
                              {option.label}
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
