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

export default function Carousel() {
  const carousel = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
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
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2 z-20 w-full max-w-[95%] justify-center">
          {carouselItems.map((item, index) => (
            <button
              key={index}
              onClick={() => carousel.current?.slickGoTo(index)}
              className={`group relative px-1 sm:px-2 md:px-4 py-1 sm:py-2 rounded-lg transition-all duration-200 flex-1 max-w-[24%]
                ${
                  currentSlide === index
                    ? 'bg-white text-black'
                    : 'bg-black/40 text-white hover:bg-black/60'
                }`}
            >
              <div className="text-left">
                <h3 className="text-[10px] sm:text-xs md:text-sm font-medium truncate">
                  {item.alt}
                </h3>
                <p className="text-[8px] sm:text-xs mt-0 sm:mt-1 opacity-80 hidden sm:block">
                  Shop Now
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
