"use client";
import { ArrowRight, Heart } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Badge } from "@/components/ui/badge";
import { Category } from "@/utils/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useTranslations } from "next-intl";
import React from "react";
import Image from "next/image";
import { useURLParams } from "@/hooks/useURLParams";
import { scrollToSection } from "@/utils/scrolls";

interface CategoriesSwiperProps {
  categories: Category[];
}

const CategoriesSwiperComponent = function CategoriesSwiper({
  categories,
}: CategoriesSwiperProps) {
  const t = useTranslations("Categories");
  const { updateParam } = useURLParams("categories");

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 25,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }}
      className="categories-carousel"
    >
      {categories.map((category, index) => (
        <SwiperSlide key={category.id}>
          <div className="group block relative overflow-hidden rounded-2xl bg-card shadow-soft hover:shadow-elegant transition-all duration-500 cursor-pointer h-[500px]">
            <Image
              src={category.cover_image_url}
              alt={category.display_name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              priority={index === 0}
            />
            <div
              className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"
              aria-hidden="true"
            />
            <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm">
              <Heart className="w-6 h-6" fill="white" aria-hidden="true" />
            </Badge>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="font-display text-2xl font-bold mb-2 group-hover:translate-x-1 transition-transform duration-300">
                {category.display_name}
              </h3>
              <p className="text-sm text-white/90 mb-4">
                {category.description}
              </p>
              <button
                type="button"
                className="flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={() => {
                  updateParam([category.id]);
                  scrollToSection("invitaciones");
                }}
              >
                <span>{t("viewDesigns")}</span>
                <ArrowRight
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export const CategoriesSwiper = React.memo(CategoriesSwiperComponent);
