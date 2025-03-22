'use client';

import { AiOutlineClose } from 'react-icons/ai';
import {
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
  MutableRefObject,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';

import useClickOutside from '@/hooks/useClickOutside';

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
        image: 'https://placehold.co/300x200',
        href: '/products?category=Best Selling Multivitamins',
      },
      {
        name: 'Vitamin D3 5000 IU',
        image: 'https://placehold.co/300x200',
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
        image: 'https://placehold.co/300x200',
        href: '/products?category=Natural Skincare',
      },
      {
        name: 'Organic Hair Care',
        image: 'https://placehold.co/300x200',
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
        image: 'https://placehold.co/300x200',
        href: '/products?category=Whey Protein',
      },
      {
        name: 'BCAA Supplements',
        image: 'https://placehold.co/300x200',
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
        image: 'https://placehold.co/300x200',
        href: '/products?category=Herbal Teas',
      },
      {
        name: 'Essential Oils',
        image: 'https://placehold.co/300x200',
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
        image: 'https://placehold.co/300x200',
        href: '/products?category=Natural Body Care',
      },
      {
        name: 'Organic Bath Products',
        image: 'https://placehold.co/300x200',
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
        image: 'https://placehold.co/300x200',
        href: '/products?category=Organic Snacks',
      },
      {
        name: 'Superfood Powders',
        image: 'https://placehold.co/300x200',
        href: '/products?category=Superfood Powders',
      },
    ],
  },
];

interface MobileCategoriesProps {
  isCategoriesVisible: boolean;
  setCategoriesVisible: Dispatch<SetStateAction<boolean>>;
}

export default function MobileCategories({
  isCategoriesVisible,
  setCategoriesVisible,
}: MobileCategoriesProps) {
  const elRef = useRef() as MutableRefObject<HTMLDivElement>;

  const handleClickOutside = () => {
    setCategoriesVisible(false);
  };

  useClickOutside(elRef, handleClickOutside);

  useEffect(() => {
    if (isCategoriesVisible) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isCategoriesVisible]);

  return (
    <div
      className={
        'fixed z-[100] top-0 left-0 w-full h-full bg-black/50 backdrop-blur-md' +
        (isCategoriesVisible ? ' block' : ' hidden')
      }
    >
      <div
        ref={elRef}
        className="flex flex-col h-full w-[85%] max-w-[350px] bg-white shadow-lg transition-all ease-linear overflow-y-auto"
      >
        <div className="flex w-full justify-between items-center border-b py-2 px-3">
          <div className="relative w-8 h-8">
            <Image
              fill
              src="/assets/logo.png"
              alt="Logo"
              className="object-fill"
              sizes="(max-width: 380px) 50vw, 100vw"
            />
          </div>
          <div
            onClick={() => setCategoriesVisible(false)}
            className="group cursor-pointer"
          >
            <AiOutlineClose
              size={22}
              className="text-gray-900 group-hover:text-gray-600 transition-all ease-linear"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {categories.map((category) => (
            <div key={category.name} className="border-b">
              <div className="p-3">
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
              </div>

              {/* Subcategories */}
              <div className="px-3 pb-3">
                <ul className="grid grid-cols-2 gap-2">
                  {category.subcategories.map((sub) => (
                    <li key={sub.name}>
                      <Link
                        href={sub.href}
                        className="text-sm text-gray-600 hover:text-green-600"
                        onClick={() => setCategoriesVisible(false)}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Featured Items */}
              <div className="px-3 pb-3">
                <div className="grid grid-cols-2 gap-3">
                  {category.featured.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group"
                      onClick={() => setCategoriesVisible(false)}
                    >
                      <div className="relative aspect-[3/2] mb-1 overflow-hidden rounded-lg">
                        <Image
                          fill
                          src={item.image}
                          alt={item.name}
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <p className="text-xs text-gray-600 group-hover:text-green-600">
                        {item.name}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
