"use client";

import {
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
  MutableRefObject,
} from "react";

import Image from "next/image";

import { AiOutlineClose } from "react-icons/ai";
import { categories } from "@/app/constants/Index";
import useClickOutside from "@/app/hooks/useClickOutside";

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
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isCategoriesVisible]);

  return (
    <>
      <div
        ref={elRef}
        className={
          "fixed z-[998] top-0 left-0 w-full h-full bg-black/50 backdrop-blur-md" +
          (isCategoriesVisible ? " block md:hidden" : " hidden")
        }
      />
      <div
        className={
          "absolute z-[999] top-0 left-0 h-full w-[85%] max-w-[350px] bg-white shadow-lg transition-all ease-linear" +
          (isCategoriesVisible ? " flex flex-col md:hidden" : " hidden")
        }
      >
        <div className="flex w-full justify-between items-center border-b py-2 px-3">
          <div className="relative w-28 h-8">
            <Image
              fill
              src="/assets/logo.png"
              alt="Logo"
              className="object-fill"
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
        <ul className="flex flex-col w-full h-full">
          {categories.map((category, index) => (
            <li
              key={index}
              className="hover:bg-gray-200 border-b p-2 cursor-pointer"
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
