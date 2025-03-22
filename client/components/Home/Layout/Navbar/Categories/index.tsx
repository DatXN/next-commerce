'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const categories = [
  {
    name: 'Vitamins & Supplements',
    subcategories: [
      { name: 'Multivitamins', href: '/products?category=Multivitamins' },
      { name: 'Vitamin D', href: '/products?category=Vitamin D' },
      { name: 'Vitamin C', href: '/products?category=Vitamin C' },
      { name: 'B Vitamins', href: '/products?category=B Vitamins' },
      { name: 'Minerals', href: '/products?category=Minerals' },
      { name: 'Antioxidants', href: '/products?category=Antioxidants' },
    ],
    featured: [
      {
        name: 'Best Selling Multivitamins',
        image: '/assets/carousel/1.webp',
        href: '/products?category=Best Selling Multivitamins',
      },
      {
        name: 'Vitamin D3 5000 IU',
        image: '/assets/carousel/2.webp',
        href: '/products?category=Vitamin D3',
      },
    ],
  },
  {
    name: 'Natural Beauty',
    subcategories: [
      { name: 'Skincare', href: '/products?category=Skincare' },
      { name: 'Hair Care', href: '/products?category=Hair Care' },
      { name: 'Makeup', href: '/products?category=Makeup' },
      { name: 'Fragrances', href: '/products?category=Fragrances' },
      { name: 'Tools & Brushes', href: '/products?category=Tools & Brushes' },
    ],
    featured: [
      {
        name: 'Natural Skincare',
        image: '/assets/carousel/3.webp',
        href: '/products?category=Natural Skincare',
      },
      {
        name: 'Organic Hair Care',
        image: '/assets/carousel/4.webp',
        href: '/products?category=Organic Hair Care',
      },
    ],
  },
  {
    name: 'Sports Nutrition',
    subcategories: [
      { name: 'Protein', href: '/products?category=Protein' },
      { name: 'Pre-Workout', href: '/products?category=Pre-Workout' },
      { name: 'Post-Workout', href: '/products?category=Post-Workout' },
      { name: 'Amino Acids', href: '/products?category=Amino Acids' },
      {
        name: 'Weight Management',
        href: '/products?category=Weight Management',
      },
    ],
    featured: [
      {
        name: 'Whey Protein',
        image: '/assets/campaigns/1.webp',
        href: '/products?category=Whey Protein',
      },
      {
        name: 'BCAA Supplements',
        image: '/assets/campaigns/2.webp',
        href: '/products?category=BCAA',
      },
    ],
  },
];

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleMouseEnter = (categoryName: string) => {
    setActiveCategory(categoryName);
    document.querySelector('main')?.classList.add('dim-main');
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
    document.querySelector('main')?.classList.remove('dim-main');
  };

  return (
    <div className="flex items-center h-full" onMouseLeave={handleMouseLeave}>
      <div className="flex h-full space-x-6">
        <div className="flex items-center">
          <Link
            href="/products"
            className="group relative flex items-center py-3 text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            All Categories
            <ChevronDownIcon
              className="ml-1 h-4 w-4 flex-none"
              aria-hidden="true"
            />
            <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary-600"></span>
          </Link>
        </div>

        {categories.map((category) => (
          <div
            key={category.name}
            className="flex"
            onMouseEnter={() => handleMouseEnter(category.name)}
          >
            <div className="relative flex items-center">
              <button
                type="button"
                className="group relative flex items-center py-3 text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-primary-600"
                aria-expanded="false"
              >
                {category.name}
                <ChevronDownIcon
                  className="ml-1 h-4 w-4 flex-none group-hover:text-primary-600"
                  aria-hidden="true"
                />
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </div>

            {/* Mega Menu Panel */}
            {activeCategory === category.name && (
              <div className="absolute inset-x-0 top-full text-gray-500 sm:text-sm z-50 bg-white">
                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top */}
                <div
                  className="absolute inset-0 top-1/2 bg-white shadow"
                  aria-hidden="true"
                />

                <div className="relative bg-white">
                  <div className="mx-auto max-w-7xl px-8">
                    <div className="grid grid-cols-1 items-start gap-x-8 gap-y-10 pb-12 pt-10 md:grid-cols-2 lg:gap-x-16">
                      {/* Category section */}
                      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:col-span-2">
                        <div>
                          <div className="font-medium text-gray-900">
                            {category.name}
                          </div>
                          <div className="mt-4 border-t border-gray-200 pt-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
                              {category.subcategories.map((subcategory) => (
                                <div
                                  key={subcategory.name}
                                  className="group relative"
                                >
                                  <Link
                                    href={subcategory.href}
                                    className="text-sm text-gray-800 hover:text-green-600"
                                  >
                                    {subcategory.name}
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Featured section */}
                      <div className="grid grid-cols-1 gap-y-10 lg:col-span-2">
                        <div className="grid grid-cols-1 gap-y-4 lg:col-span-2">
                          <div className="font-medium text-gray-900">
                            Featured
                          </div>
                          <div className="mt-4 border-t border-gray-200 pt-6">
                            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-8">
                              {category.featured.map((item) => (
                                <div key={item.name} className="group relative">
                                  <div className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                    <Image
                                      src={item.image}
                                      alt={item.name}
                                      fill
                                      className="object-cover transition duration-300 group-hover:scale-105"
                                      placeholder="blur"
                                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyVC08MTY3LjIyOUFTRjo/Tj4yMkhiSk46NjVBWlFOTU5BQUFBQUH/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAb/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                    />
                                  </div>
                                  <div className="mt-4 block">
                                    <h3 className="text-sm font-medium text-gray-900">
                                      <Link
                                        href={item.href}
                                        className="hover:text-green-600"
                                      >
                                        <span
                                          aria-hidden="true"
                                          className="absolute inset-0"
                                        />
                                        {item.name}
                                      </Link>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                      Shop now
                                    </p>
                                  </div>
                                </div>
                              ))}

                              <div className="group relative">
                                <div className="flex h-40 items-center justify-center rounded-md border border-dashed border-gray-200 bg-gray-50">
                                  <Link
                                    href={`/products?category=${category.name}`}
                                    className="text-sm font-medium text-green-600 hover:text-green-800 flex flex-col items-center"
                                  >
                                    <span className="text-2xl">+</span>
                                    <span>Browse all</span>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
