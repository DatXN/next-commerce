'use client';

import { useRef, useState } from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Image from 'next/image';
import Link from 'next/link';

import { carouselItems } from '@/lib/constants';
import { CarouselProps, CarouselPropsDefault } from './carouselProps';

import { CarouselArrow } from './Arrow';

export default function Carousel(userProps: CarouselProps) {
  const props: Required<CarouselProps> = {
    ...CarouselPropsDefault,
    ...userProps,
  };

  const carousel = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    ...props,
    dots: false,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
  };

  return (
    <div className="w-full bg-white">
      <div className="relative w-full max-w-[1920px] mx-auto">
        <Slider
          ref={carousel}
          {...settings}
          prevArrow={<CarouselArrow carousel={carousel} direction="left" />}
          nextArrow={<CarouselArrow carousel={carousel} direction="right" />}
          className="carousel"
        >
          {carouselItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
                <Image
                  fill
                  src={item.src}
                  alt={item.alt}
                  sizes="100vw"
                  className="object-cover"
                  priority={true}
                />
              </div>
            </Link>
          ))}
        </Slider>

        {/* Info Panels */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20 px-4 max-w-full overflow-x-auto">
          {carouselItems.map((item, index) => (
            <button
              key={index}
              onClick={() => carousel.current?.slickGoTo(index)}
              className={`group relative w-[180px] h-[64px] overflow-hidden rounded-lg transition-all duration-200 flex-shrink-0
                ${
                  currentSlide === index
                    ? 'ring-2 ring-green-600 scale-105'
                    : 'ring-1 ring-white/50 hover:ring-white'
                }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  fill
                  src={item.src}
                  alt={item.alt}
                  className="object-cover group-hover:scale-110 transition-transform duration-200"
                  sizes="180px"
                />
                <div
                  className={`absolute inset-0 bg-black/40 ${
                    currentSlide === index
                      ? 'bg-opacity-30'
                      : 'group-hover:bg-opacity-30'
                  }`}
                />
              </div>

              {/* Text Content */}
              <div className="relative p-2 text-left">
                <h3 className="text-white text-sm font-medium line-clamp-2">
                  {item.alt}
                </h3>
                <p className="text-white/80 text-xs mt-1">Shop Now</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
