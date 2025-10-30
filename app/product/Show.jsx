"use client";
import React, { useContext, useState, useEffect } from "react";

import Marquee from "../../comps/Marquee";
import { urlFor } from "../../lib/client";
import { UC } from "../context";
import { Minus, Plus, Star } from "../../comps/Svg";
import { convertToJPYWithCache } from "../../lib/currency";

const Show = ({ product, products }) => {
  console.log("show");
  const { incQty, decQty, qty, onAdd } = useContext(UC);
  
  // USE STATES
  const [photoIndex, setphotoIndex] = useState(0);
  const [jpyPrice, setJpyPrice] = useState("");
  const [zoom, setZoom] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Convert price to JPY
  useEffect(() => {
    const convertPrice = async () => {
      const price = await convertToJPYWithCache(product.price);
      setJpyPrice(price);
    };
    convertPrice();
  }, [product.price]);

  const imgMouseOver = (e) => {
    const img = document.getElementById("main-img");
    if (!img) return;
    
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    img.style.transformOrigin = `${x}px ${y}px`;
    img.style.transform = "scale(2.5)";
    setZoom(true);
  };

  const mouseLeave = () => {
    const img = document.getElementById("main-img");
    if (!img) return;
    
    img.style.transform = "scale(1)";
    img.style.transformOrigin = "center";
    setZoom(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-600">
          <span className="hover:text-primary transition-colors">Home</span>
          <span className="mx-2">/</span>
          <span className="hover:text-primary transition-colors">Products</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{product.model}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 p-4 sm:p-6 lg:p-8">
            {/* === IMAGE SECTION */}
            <section className="space-y-4">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-square group">
                <img
                  id="main-img"
                  className={`object-cover w-full h-full transition-transform duration-300 cursor-zoom-in ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  src={urlFor(product.image && product.image[photoIndex])}
                  alt={product.model}
                  onMouseMove={(e) => imgMouseOver(e)}
                  onMouseLeave={mouseLeave}
                  onLoad={() => setImageLoaded(true)}
                />
                
                {/* Loading Skeleton */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                )}

                {/* Zoom Indicator */}
                <div className={`absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity ${zoom ? 'hidden' : ''}`}>
                  Hover to Zoom
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {product.image.map((e, i) => (
                  <button
                    key={i}
                    onClick={() => setphotoIndex(i)}
                    className={`flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                      photoIndex === i 
                        ? 'border-primary shadow-md scale-105' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      alt={`${product.model} view ${i + 1}`}
                      src={urlFor(e)}
                      className="h-20 w-20 sm:h-24 sm:w-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            </section>

            {/* === DETAILS SECTION */}
            <section className="space-y-6 sm:space-y-8">
              {/* Product Title & Rating */}
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                  {product.model}
                </h1>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        styles={`h-5 w-5 ${star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm font-medium">
                    (9 reviews)
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-green-600 text-sm font-semibold">
                    In Stock
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Price</p>
                <p className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {jpyPrice || `$${product.price}`}
                </p>
              </div>

              {/* Details */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full"></span>
                  Details
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {product.details}
                </p>
              </div>

              {/* Quantity Selector */}
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-700 mb-3">
                  Quantity:
                </h3>
                <div className="inline-flex items-center border-2 border-gray-300 rounded-xl overflow-hidden">
                  <button
                    className="p-2 sm:p-3 hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-700"
                    onClick={() => decQty()}
                    disabled={qty <= 1}
                  >
                    <Minus styles="h-5 w-5" />
                  </button>
                  <span className="px-4 sm:px-6 py-2 text-base sm:text-lg font-bold text-gray-900 min-w-[3rem] text-center border-x border-gray-300">
                    {qty}
                  </span>
                  <button
                    className="p-2 sm:p-3 hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-700"
                    onClick={() => incQty()}
                  >
                    <Plus styles="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <button
                  className="w-full bg-gradient-to-r from-primary to-green-600 text-white font-semibold text-base sm:text-lg py-4 sm:py-5 rounded-xl hover:from-green-600 hover:to-primary active:scale-95 transition-all duration-200 shadow-lg shadow-primary/30"
                  onClick={() => onAdd(product, qty)}
                >
                  Add to Cart
                </button>

                <button
                  className="w-full border-2 border-primary text-primary font-semibold text-base sm:text-lg py-4 sm:py-5 rounded-xl hover:bg-primary hover:text-white active:scale-95 transition-all duration-200"
                >
                  Buy Now
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl mb-1">🚚</div>
                  <p className="text-xs text-gray-600 font-medium">Free Shipping</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">↩️</div>
                  <p className="text-xs text-gray-600 font-medium">Easy Returns</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">✓</div>
                  <p className="text-xs text-gray-600 font-medium">1 Year Warranty</p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12 sm:mt-16">
          <Marquee products={products} />
        </div>
      </div>
    </div>
  );
};

export default Show;
