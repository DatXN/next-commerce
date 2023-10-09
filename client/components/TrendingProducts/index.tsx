"use client";

import { useProducts } from "@/context/ProductsContext";

import Scrollable from "../Scrollable";
import ProductCard from "../ProductCard";
import ProductCardSkeleton from "../ProductCard/ProductCardSkeleton";

export default function TrendingProducts() {
  const { productsResponse, isLoading } = useProducts();

  return (
    <section id="trending">
      <article className="w-full px-5 my-3">
        <h1 className="text-gray-700 font-bold text-xl select-none mb-2">
          Trending Products
        </h1>
        <Scrollable dragging={true}>
          {isLoading
            ? Array.from({ length: 20 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : productsResponse.products.map((product) => (
                <ProductCard
                  id={product.id}
                  key={product.id}
                  brand={product.brand}
                  name={product.name}
                  src={product.src}
                  alt="Product Image"
                  slug={product.slug}
                  price={product.price}
                  discountPrice={product.discountPrice}
                  isFavorite={product.isFavorite}
                />
              ))}
        </Scrollable>
      </article>
    </section>
  );
}
