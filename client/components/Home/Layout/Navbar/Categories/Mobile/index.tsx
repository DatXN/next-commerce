'use client';

import { AiOutlineClose } from 'react-icons/ai';
import {
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
  MutableRefObject,
  useState,
  Fragment,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/24/outline';

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

interface MobileCategoriesProps {
  isCategoriesVisible: boolean;
  setCategoriesVisible: Dispatch<SetStateAction<boolean>>;
}

export default function MobileCategories({
  isCategoriesVisible,
  setCategoriesVisible,
}: MobileCategoriesProps) {
  const closeMenu = () => {
    setCategoriesVisible(false);
  };

  useEffect(() => {
    if (isCategoriesVisible) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isCategoriesVisible]);

  return (
    <Transition.Root show={isCategoriesVisible} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeMenu}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-sm flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div className="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500"
                  onClick={closeMenu}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Mobile navigation menu */}
              <div className="mt-2 space-y-2 px-4">
                {categories.map((category) => (
                  <Disclosure
                    as="div"
                    key={category.name}
                    className="border-b border-gray-200 py-3"
                  >
                    {({ open }: { open: boolean }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between py-2 text-left">
                          <span className="text-sm font-bold text-gray-900">
                            {category.name}
                          </span>
                          <ChevronDownIcon
                            className={`h-5 w-5 ${
                              open ? 'rotate-180 transform' : ''
                            } text-gray-500`}
                          />
                        </Disclosure.Button>

                        <Disclosure.Panel className="pt-3 pb-6">
                          <div className="space-y-6">
                            {/* Subcategories */}
                            <div>
                              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                Categories
                              </h3>
                              <ul className="mt-3 grid grid-cols-2 gap-y-3 gap-x-4">
                                {category.subcategories.map((subcategory) => (
                                  <li
                                    key={subcategory.name}
                                    className="flow-root"
                                  >
                                    <Link
                                      href={subcategory.href}
                                      className="text-sm text-gray-800 hover:text-green-600"
                                      onClick={closeMenu}
                                    >
                                      {subcategory.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Featured items */}
                            <div>
                              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                Featured
                              </h3>
                              <div className="mt-3 grid grid-cols-2 gap-4">
                                {category.featured.map((item) => (
                                  <div
                                    key={item.name}
                                    className="group relative text-sm"
                                  >
                                    <div className="overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-90">
                                      <div className="relative w-full h-24 overflow-hidden rounded">
                                        <Image
                                          src={item.image}
                                          alt={item.name}
                                          fill
                                          className="object-cover"
                                          placeholder="blur"
                                          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                                        />
                                      </div>
                                    </div>
                                    <Link
                                      href={item.href}
                                      className="mt-2 block text-xs font-medium text-gray-900"
                                      onClick={closeMenu}
                                    >
                                      {item.name}
                                    </Link>
                                  </div>
                                ))}

                                <div className="group relative text-sm">
                                  <div className="flex h-24 w-full items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50">
                                    <Link
                                      href={`/products?category=${category.name}`}
                                      className="text-xs font-medium text-green-600 flex flex-col items-center"
                                      onClick={closeMenu}
                                    >
                                      <PlusIcon className="h-5 w-5" />
                                      <span>Browse all</span>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
