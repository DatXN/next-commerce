'use client';

import {
  AiOutlineHeart,
  AiOutlineMenu,
  AiOutlineShopping,
  AiOutlineUser,
  AiOutlineSearch,
} from 'react-icons/ai';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu } from 'react-icons/fi';

import { useShoppingCart } from '@/context/ShoppingCartContext';
import { useAuth } from '@/context/AuthContext';

import MobileCategories from './Categories/Mobile';
import Categories from './Categories';

export default function Navbar() {
  const router = useRouter();
  const { openCart, cartQuantity } = useShoppingCart();
  const { authenticated } = useAuth();
  const [isCategoriesVisible, setCategoriesVisible] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/products?q=${searchQuery}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Top Bar */}
      <div className="bg-green-600 text-white py-1">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span>Free shipping on orders over $50</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">
                30-day money-back guarantee
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/about" className="hover:text-green-100">
                About Us
              </Link>
              <Link href="/help" className="hover:text-green-100">
                Help
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        {/* Mobile Search Bar */}
        <div className="md:hidden py-2">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for vitamins, supplements, and more..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
            />
            <button
              onClick={() => router.push(`/products?q=${searchQuery}`)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
            >
              <AiOutlineSearch size={20} />
            </button>
          </div>
        </div>

        <div className="relative flex items-center justify-between py-4 h-20">
          {/* Mobile Menu Button - Left side on mobile */}
          <div className="md:hidden z-10 h-full flex items-center">
            <button
              onClick={() => setCategoriesVisible(true)}
              className="flex items-center justify-center p-2 text-gray-700 hover:text-green-600"
              aria-label="Open menu"
            >
              <FiMenu size={24} />
            </button>
          </div>

          {/* Logo - Center on mobile, left on desktop */}
          <div className="flex-1 flex justify-center md:justify-start md:items-center h-full md:flex-initial md:w-[15%] lg:w-[12%]">
            <Link
              href="/"
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 md:relative md:left-auto md:top-auto md:transform-none flex-shrink-0"
            >
              <div className="relative w-32 h-10 md:w-36 md:h-11">
                <Image
                  fill
                  src="/assets/logo.png"
                  alt="Logo"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 flex-grow max-w-none md:w-[65%] lg:w-[75%] mx-2 md:mx-4 lg:mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for vitamins, supplements, and more..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
              />
              <button
                onClick={() => router.push(`/products?q=${searchQuery}`)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <AiOutlineSearch size={20} />
              </button>
            </div>
          </div>

          {/* Right Navigation - On right for both mobile and desktop */}
          <div className="flex items-center h-full space-x-4 md:space-x-4 z-10 md:flex-initial md:w-[20%] lg:w-[13%] md:justify-end">
            {authenticated ? (
              <Link
                href="/profile"
                className="flex flex-col items-center justify-center text-gray-700 hover:text-green-600"
              >
                <AiOutlineUser size={24} />
                <span className="text-xs hidden sm:inline">Account</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex flex-col items-center justify-center text-gray-700 hover:text-green-600"
              >
                <AiOutlineUser size={24} />
                <span className="text-xs hidden sm:inline">Sign In</span>
              </Link>
            )}
            <Link
              href="/favorites"
              className="flex flex-col items-center justify-center text-gray-700 hover:text-green-600"
            >
              <AiOutlineHeart size={24} />
              <span className="text-xs hidden sm:inline">Favorites</span>
            </Link>
            <button
              onClick={openCart}
              className="relative flex flex-col items-center justify-center text-gray-700 hover:text-green-600"
            >
              <AiOutlineShopping size={24} />
              <span className="text-xs hidden sm:inline">Cart</span>
              {cartQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartQuantity > 9 ? '9+' : cartQuantity}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Categories Navigation - Only visible on desktop */}
        <div className="hidden md:block border-t border-b border-gray-200">
          <div className="flex justify-between items-center">
            <Categories />
            <div className="flex space-x-6 py-2">
              {[
                { name: 'Best Sellers', href: '/products?sort=best-sellers' },
                { name: 'New Arrivals', href: '/products?filter=new-arrivals' },
                { name: 'Special Offers', href: '/offers' },
                { name: 'Brands', href: '/brands' },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group relative text-sm font-medium text-gray-800 hover:text-primary-600"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Categories Menu */}
      <MobileCategories
        isCategoriesVisible={isCategoriesVisible}
        setCategoriesVisible={setCategoriesVisible}
      />
    </header>
  );
}
