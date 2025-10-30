import Link from "next/link";
import { client } from "../lib/client";
import Img from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { ProductsTypes } from "../app/page";
import { memo, useContext, useEffect, useState } from "react";
import { UC } from "../app/context";
import { convertToJPYWithCache } from "../lib/currency";

interface MarqueeProductProps {
  products: ProductsTypes;
}

const MarqueeProduct = ({ products }: MarqueeProductProps) => {
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
    <div className="group relative bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden w-[280px] sm:w-[320px] flex-shrink-0">
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden">
        <Link href={`/product/${products.slug.current}`} tabIndex={0}>
          <Img 
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" 
            alt={products.name} 
            {...imageProps} 
          />
        </Link>
        
        {/* Favorite Button */}
        {isLoaded && (
          <button
            onClick={() => {
              saveToLocalS(products);
            }}
            className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200 active:scale-95 z-10"
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

      {/* Product Info Container */}
      <div className="p-4 space-y-3">
        {/* Product Name */}
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 min-h-[3em]">
          {products.name}
        </h3>

        {/* Price Section */}
        <div className="flex items-baseline gap-3">
          {jpyOldPrice && (
            <span className="text-sm text-gray-400 line-through">
              {jpyOldPrice}
            </span>
          )}
          <span className="text-xl font-bold text-gray-900">
            {jpyPrice || `$${products.price}`}
          </span>
        </div>

        {/* Cart Button */}
        <button
          onClick={() => onAdd(products, 1)}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-all duration-200 ${
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
            className="h-5 w-5"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <span className="text-sm">
            {cartItems.filter((item: any) => item._id == products._id).length >= 1 ? "Added" : "Add to Cart"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default memo(MarqueeProduct);

