import MarqueeProduct from "./MarqueeProduct";
import { memo } from "react";

const Marquee = ({ products }) => {
  console.log("marquee");
  return (
    <div className="mt-12 sm:mt-16">
      <h2 className="text-center text-gray-900 text-2xl sm:text-3xl font-bold mb-8">
        You May Also Like
      </h2>

      <div className="relative w-full overflow-hidden">
        <div className="animate-marquee flex gap-4 sm:gap-2">
          {/* Double the products for seamless loop */}
          {[...products, ...products].map((product, index) => (
            <MarqueeProduct 
              key={`${product._id}-${index}`} 
              products={product} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Marquee);
