'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
        image:
          'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=300&h=200&fit=crop',
        href: '/products?category=Best Selling Multivitamins',
      },
      {
        name: 'Vitamin D3 5000 IU',
        image:
          'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=300&h=200&fit=crop',
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
        image:
          'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=300&h=200&fit=crop',
        href: '/products?category=Natural Skincare',
      },
      {
        name: 'Organic Hair Care',
        image:
          'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=300&h=200&fit=crop',
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
        image:
          'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=300&h=200&fit=crop',
        href: '/products?category=Whey Protein',
      },
      {
        name: 'BCAA Supplements',
        image:
          'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=300&h=200&fit=crop',
        href: '/products?category=BCAA',
      },
    ],
  },
  {
    name: 'Herbs & Natural Remedies',
    subcategories: [
      {
        name: 'Herbal Supplements',
        href: '/products?category=Herbal Supplements',
      },
      { name: 'Traditional Chinese Medicine', href: '/products?category=TCM' },
      { name: 'Ayurvedic', href: '/products?category=Ayurvedic' },
      { name: 'Homeopathy', href: '/products?category=Homeopathy' },
      { name: 'Essential Oils', href: '/products?category=Essential Oils' },
    ],
    featured: [
      {
        name: 'Herbal Teas',
        image:
          'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=300&h=200&fit=crop',
        href: '/products?category=Herbal Teas',
      },
      {
        name: 'Essential Oils',
        image:
          'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=300&h=200&fit=crop',
        href: '/products?category=Essential Oils',
      },
    ],
  },
  {
    name: 'Bath & Body',
    subcategories: [
      { name: 'Body Care', href: '/products?category=Body Care' },
      { name: 'Hand & Foot Care', href: '/products?category=Hand & Foot Care' },
      { name: 'Oral Care', href: '/products?category=Oral Care' },
      { name: 'Personal Care', href: '/products?category=Personal Care' },
      {
        name: 'Natural Deodorants',
        href: '/products?category=Natural Deodorants',
      },
    ],
    featured: [
      {
        name: 'Natural Body Care',
        image:
          'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=300&h=200&fit=crop',
        href: '/products?category=Natural Body Care',
      },
      {
        name: 'Organic Bath Products',
        image:
          'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=300&h=200&fit=crop',
        href: '/products?category=Organic Bath',
      },
    ],
  },
  {
    name: 'Healthy Foods',
    subcategories: [
      { name: 'Superfoods', href: '/products?category=Superfoods' },
      { name: 'Organic Foods', href: '/products?category=Organic Foods' },
      { name: 'Gluten-Free', href: '/products?category=Gluten-Free' },
      { name: 'Snacks', href: '/products?category=Snacks' },
      { name: 'Beverages', href: '/products?category=Beverages' },
    ],
    featured: [
      {
        name: 'Organic Snacks',
        image:
          'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=300&h=200&fit=crop',
        href: '/products?category=Organic Snacks',
      },
      {
        name: 'Superfood Powders',
        image:
          'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=300&h=200&fit=crop',
        href: '/products?category=Superfood Powders',
      },
    ],
  },
];

export default function Categories() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <nav className="relative">
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <ul className="flex justify-between border-b">
          {categories.map((category) => (
            <li
              key={category.name}
              className="relative"
              onMouseEnter={() => {
                setActiveCategory(category.name);
                document.querySelector('main')?.classList.add('dim-main');
              }}
              onMouseLeave={() => {
                setActiveCategory(null);
                document.querySelector('main')?.classList.remove('dim-main');
              }}
            >
              <button className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-green-600">
                {category.name}
              </button>

              {/* Mega Menu */}
              {activeCategory === category.name && (
                <div
                  className="fixed left-1/2 -translate-x-1/2 top-[150px] w-[98vw] max-w-[98vw] bg-white border border-gray-200 shadow-lg rounded-lg z-[100]"
                  onMouseEnter={() => {
                    setActiveCategory(category.name);
                    document.querySelector('main')?.classList.add('dim-main');
                  }}
                  onMouseLeave={() => {
                    setActiveCategory(null);
                    document
                      .querySelector('main')
                      ?.classList.remove('dim-main');
                  }}
                >
                  <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-12 gap-8">
                      {/* Subcategories */}
                      <div className="col-span-4">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">
                          Shop by Category
                        </h3>
                        <ul className="space-y-3">
                          {categories
                            .find((c) => c.name === activeCategory)
                            ?.subcategories.map((sub) => (
                              <li key={sub.name}>
                                <Link
                                  href={sub.href}
                                  className="text-sm text-gray-600 hover:text-green-600 block"
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>

                      {/* Featured Items */}
                      <div className="col-span-8">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">
                          Featured Items
                        </h3>
                        <div className="grid grid-cols-3 gap-6">
                          {categories
                            .find((c) => c.name === activeCategory)
                            ?.featured.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="group"
                              >
                                <div className="relative aspect-[3/2] mb-2 overflow-hidden rounded-lg">
                                  <Image
                                    fill
                                    src={item.image}
                                    alt={item.name}
                                    className="object-cover transition-transform group-hover:scale-105"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyVC08MTY3LjIyOUFTRjo/Tj4yMkhiSk46NjVBWlFOTU5BQUFBQUH/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAb/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                  />
                                </div>
                                <p className="text-sm text-gray-600 group-hover:text-green-600">
                                  {item.name}
                                </p>
                              </Link>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <ul className="flex overflow-x-auto border-b">
          {categories.map((category) => (
            <li key={category.name}>
              <button
                onClick={() =>
                  router.push(`/products?category=${category.name}`)
                }
                className="px-4 py-3 text-sm font-medium text-gray-700 whitespace-nowrap hover:text-green-600"
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
