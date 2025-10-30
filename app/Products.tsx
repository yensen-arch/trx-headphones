import Link from "next/link";
import { client } from "../lib/client";
import Img from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { ProductsTypes } from "./page";
import { memo, useContext, useEffect, useState } from "react";
import { UC } from "./context";
import { convertToJPYWithCache } from "../lib/currency";

interface ProductsProps {
  products: ProductsTypes;
  gap?: string;
}

const Products = ({ products, gap }: ProductsProps) => {
  const [isLoaded, setIsloaded] = useState<boolean>(false);
  const [jpyPrice, setJpyPrice] = useState<string>("");
  const [jpyOldPrice, setJpyOldPrice] = useState<string>("");
  const { onAdd, cartItems } = useContext(UC);

  const imageProps = useNextSanityImage(client, products.image[0]);

  useEffect(() => {
    setIsloaded(true);
    // Convert prices to JPY
    const convertPrices = async () => {
      const price = await convertToJPYWithCache(products.price);
      const oldPrice = await convertToJPYWithCache(products.oldPrice);
      setJpyPrice(price);
      setJpyOldPrice(oldPrice);
    };
    convertPrices();
  }, [products.price, products.oldPrice]);
  const saveToLocalS = (product: ProductsTypes) => {
    if (localStorage.trxfav) {
      if (
        JSON.parse(localStorage.trxfav).filter(
          (each: ProductsTypes) => each._id == product._id
        ).length >= 1
      ) {
        const filterd = JSON.parse(localStorage.trxfav).filter(
          (each: ProductsTypes) => each._id != product._id
        );
        localStorage.setItem("trxfav", JSON.stringify(filterd));
      } else {
        localStorage.setItem(
          "trxfav",
          JSON.stringify([...JSON.parse(localStorage.trxfav), product])
        );
      }
    } else {
      localStorage.setItem("trxfav", JSON.stringify([product]));
    }
  };

  return (
    <div
      className={`${gap} group relative bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden w-full max-w-full sm:max-w-sm md:max-w-md`}
    >
      {/* Image Container with Gradient Overlay on Mobile */}
      <div className="relative w-full aspect-square overflow-hidden">
        <Link href={`/product/${products.slug.current}`} tabIndex={0}>
          <Img 
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" 
            alt={products.name} 
            {...imageProps} 
          />
        </Link>
        
        {/* Gradient Overlay on Mobile - More Subtle */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none opacity-100 sm:opacity-0"></div>
        
        {/* Action Buttons - Floating on Image (Mobile) */}
        <div className="absolute top-2 right-2 flex gap-1 sm:gap-2">
          {/* Favorite Button */}
          {isLoaded && (
            <button
              onClick={() => {
                saveToLocalS(products);
              }}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200 active:scale-95"
              aria-label="Add to Favorite"
            >
              <svg
                className={`h-5 w-5 transition-colors duration-300 ${typeof window !== 'undefined' && window.localStorage.trxfav && JSON.parse(localStorage.trxfav).filter((each: ProductsTypes) => each._id == products._id).length >= 1 ? "fill-red-500 stroke-red-500" : "stroke-gray-600 fill-transparent"}`}
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Product Info Container */}
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        {/* Product Name */}
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 min-h-[2.5em] sm:min-h-[3em]">
          {products.name}
        </h3>

        {/* Price Section */}
        <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
          {jpyOldPrice && (
            <span className="text-xs sm:text-sm text-gray-400 line-through">
              {jpyOldPrice}
            </span>
          )}
          <span className="text-lg sm:text-xl font-bold text-gray-900">
            {jpyPrice || `$${products.price}`}
          </span>
        </div>

        {/* Action Bar - Bottom Section */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          {/* Cart Button */}
          <button
            onClick={() => onAdd(products, 1)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-200 ${
              cartItems.filter((item: any) => item._id == products._id).length >= 1
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300"
            } active:scale-95`}
            aria-label="Add to Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-4 w-4 sm:h-5 sm:w-5"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span className="text-xs sm:text-sm">
              {cartItems.filter((item: any) => item._id == products._id).length >= 1 ? "Added" : "Add"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Products);
