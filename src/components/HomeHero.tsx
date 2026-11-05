"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { FaArrowDownLong } from "react-icons/fa6";
import Swiper from "swiper";
import { Autoplay, EffectFade, FreeMode, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

const slides = [
  { src: "/images/hero/hero-0.png", width: 1920, height: 1080 },
  { src: "/images/hero/hero-1.png", width: 1785, height: 1004 },
  { src: "/images/hero/hero-2.png", width: 1708, height: 961 },
  { src: "/images/hero/hero-3.png", width: 1772, height: 997 },
  { src: "/images/hero/hero-5.png", width: 1814, height: 1021 },
  { src: "/images/hero/hero-6.png", width: 1776, height: 999 },
  { src: "/images/hero/hero-7.png", width: 1603, height: 902 },
  { src: "/images/hero/hero-8.png", width: 1703, height: 957 },
  { src: "/images/hero/hero-9.png", width: 1550, height: 872 },
  { src: "/images/hero/hero-10.png", width: 1268, height: 713 },
  { src: "/images/hero/hero-11.png", width: 1638, height: 922 },
];

const VISIBLE_THUMBS = 3;

export default function HomeHero() {
  const mainRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  // Swiper starts here rather than through `swiper/react`, which creates its
  // instance during render. Autoplay reads the current time on creation, and
  // Cache Components rejects that while prerendering a Client Component.
  useEffect(() => {
    if (!mainRef.current || !thumbsRef.current) return;

    const thumbs = new Swiper(thumbsRef.current, {
      modules: [FreeMode, Thumbs],
      spaceBetween: 10,
      slidesPerView: VISIBLE_THUMBS,
      freeMode: true,
      watchSlidesProgress: true,
    });

    const main = new Swiper(mainRef.current, {
      modules: [Autoplay, EffectFade, Thumbs],
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      effect: "fade",
      fadeEffect: { crossFade: true },
      thumbs: { swiper: thumbs },
    });

    return () => {
      main.destroy();
      thumbs.destroy();
    };
  }, []);

  return (
    <div className="relative block">
      <div ref={mainRef} className="relative swiper">
        <div className="swiper-wrapper">
          {slides.map((slide, index) => (
            <div key={slide.src} className="swiper-slide">
              <div className="relative w-full aspect-3x4 landscape:aspect-auto landscape:min-h-screen">
                <Image
                  src={slide.src}
                  fill
                  sizes="100vw"
                  preload={index === 0}
                  className="object-cover"
                  alt="Hero Image Slide"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute left-0 bottom-0 w-full h-2/3 md:h-1/2 bg-linear-to-t from-black z-10" />
      <div className="absolute left-0 bottom-5 md:bottom-10 w-full px-page z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 gap-x-10 items-end max-w-7xl mx-auto">
          <div className="relative text-white text-shadow-lg/40 font-title">
            <h1 className="text-2xl md:text-4xl xl:text-6xl leading-none">
              Salsera Cubana
            </h1>
            <h2 className="text-xl md:text-2xl leading-none text-amber-700">
              Ontsteek het vuur van de Cubaanse salsa
            </h2>
          </div>
          <div>
            <div ref={thumbsRef} className="swiper">
              <div className="swiper-wrapper">
                {slides.map((slide, index) => (
                  <div key={slide.src} className="swiper-slide bg-black">
                    <Image
                      src={slide.src}
                      width={slide.width}
                      height={slide.height}
                      sizes="(min-width: 1024px) 200px, 33vw"
                      loading={index < VISIBLE_THUMBS ? "eager" : "lazy"}
                      className="border border-white/10 opacity-75 transition-all"
                      alt="Hero Image Slide"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block absolute bottom-10 right-4 md:right-1/2 md:translate-x-1/2 text-white animate-scroll-down z-20">
        <FaArrowDownLong />
      </div>
    </div>
  );
}
