"use client";
import { useState, useMemo } from "react";
import { BannerDataTypes, ProductsTypes } from "../app/page";
import FooterBanner from "../comps/FooterBanner";
import MainBanner from "./MainBanner";
import Products from "../app/Products";
import ProductSort from "./ProductSort";

interface HomeProps {
  products: ProductsTypes[];
  bannerData: BannerDataTypes[];
}

const Home = ({ products, bannerData }: HomeProps) => {
  const [sortType, setSortType] = useState<string>("");

  // Sort products based on selected sort type
  const sortedProducts = useMemo(() => {
    if (!sortType) return products;
    
    const sorted = [...products];
    if (sortType === "low-to-high") {
      return sorted.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-to-low") {
      return sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  }, [products, sortType]);

  return (
    <main>
      {/* === MAIN BANNER  */}
      <MainBanner banner={bannerData[0]} />

      <section className="  mb-4 flex items-center flex-col">
        <h1
          className=" headTitle px-8 py-4 sm:py-2 sm:text-4xl text-2xl text-secondary
         font-sans font-extrabold sm:rounded-t-3xl"
        >
          Best Selling Headphones
        </h1>
        {/* <p className=" text-base text-secondary">Best in the Market</p> */}
      </section>

      {/* === SORT COMPONENT  */}
      <div className="lg:mx-20 px-4">
        <ProductSort onSortChange={setSortType} currentSort={sortType} />
      </div>

      {/* === SHOW PRODUCTS - Changed from 4x3 to 3x4 grid  */}
      <section
        className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
       lg:mx-20 overflow-hidden
      "
      >
        {/* === MAP PRODUCTS  */}
        {sortedProducts?.map((products: ProductsTypes) => {
          return <Products key={products._id} products={products} />;
        })}
      </section>

      {/* ==== FOOTER BANNER  */}
      <FooterBanner bannerData={bannerData && bannerData[1]} />
    </main>
  );
};

export default Home;
