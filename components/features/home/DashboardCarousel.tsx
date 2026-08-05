"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

interface DashboardPanel {
  title: string;
  description: string;
  alt: string;
}

interface DashboardCarouselProps {
  panels: DashboardPanel[];
  images: readonly string[];
}

export function DashboardCarousel({ panels, images }: DashboardCarouselProps) {
  return (
    <Swiper
      slidesPerView={1.16}
      spaceBetween={20}
      grabCursor
      className="px-5 pb-5"
      aria-label="Funciones de la plataforma Bento"
    >
      {panels.map((panel, index) => (
        <SwiperSlide key={panel.title} className="!h-auto">
          <article className="h-full">
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: "16 / 10", backgroundColor: "var(--bento-peach)" }}
            >
              <Image
                src={images[index] ?? images[0] ?? ""}
                alt={panel.alt}
                fill
                className="object-cover object-top"
                sizes="84vw"
              />
            </div>
            <h3
              className="mt-5 font-display text-2xl font-normal leading-tight"
              style={{ color: "var(--bento-ink)", letterSpacing: "-0.02em" }}
            >
              {panel.title}
            </h3>
            <p
              className="mt-2 text-sm leading-relaxed"
              style={{ color: "rgba(32, 0, 65, 0.6)" }}
            >
              {panel.description}
            </p>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
