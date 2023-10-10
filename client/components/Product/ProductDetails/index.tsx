"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useParams } from "next/navigation";

import { Product, ProductImages } from "@/lib/types";

import AddToCart from "./AddToCart";
import VariantSelector from "./VariantSelector";
import DetailsTab from "./DetailsTab";
import Gallery from "./Gallery";

export default function ProductDetails() {
  const searchParams = useSearchParams();
  const params = useParams();

  const currentSize = searchParams.get("size");
  const currentColor = searchParams.get("color");

  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await axios
        .get(
          process.env.NEXT_PUBLIC_API_URL +
            `/products/details?productId=${params.id}`
        )
        .then((response) => {
          return response.data;
        });
      setProduct(product);
    };
    fetchProduct();
  }, [params.id]);

  return (
    <>
      <div className="flex gap-2 mb-2 text-gray-600 select-none">
        <Link href="/">
          <span className="hover:text-gray-900 hover:underline">Homepage</span>
        </Link>
        <span>/</span>
        <Link href={"/products?brand=" + product?.brand}>
          <span className="hover:text-gray-900 hover:underline">
            {product?.brand}
          </span>
        </Link>
        <span>/</span>
        <Link href={"/products?category=" + product?.category}>
          <span className="hover:text-gray-900 hover:underline">
            {product?.category}
          </span>
        </Link>
        <span>/</span>
        <Link href={"/products?subcategory=" + product?.subcategory}>
          <span className="hover:text-gray-900 hover:underline">
            {product?.subcategory}
          </span>
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="flex-[2] border">
          <Gallery images={product?.images as ProductImages[]} />
        </div>
        <div className="flex flex-[1] flex-col border">
          <div className="p-4 select-none">
            <h1 className="text-[32px] font-extrabold">{product?.name}</h1>
            <div className="flex items-center justify-start text-xl text-gray-700 font-semibold mt-1">
              {product?.price ? product?.discountPrice : product?.price} USD
            </div>
          </div>
          <div className="w-full h-[1px] rounded-full bg-neutral-200" />
          <div className="flex flex-col p-4">
            <VariantSelector
              product={product as Product}
              currentSize={currentSize as string}
              currentColor={currentColor as string}
            />
            <AddToCart
              product={product as Product}
              color={currentColor as string}
              size={currentSize as string}
            />
          </div>
          <DetailsTab product={product as Product} />
        </div>
      </div>
    </>
  );
}
