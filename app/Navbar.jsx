"use client";
import Link from "next/link";
import { useContext } from "react";
import Cart from "../comps/Cart";
import { UC } from "../app/context";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const Navbar = () => {
  const { showCart, setshowCart, totalQuantities } = useContext(UC);

  const notify = () => toast.error("Not Ready Yet!");

  return (
    <>
      <Toaster position="top-right" />
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo Section */}
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
              <div className="logoText flex items-center gap-1.5 sm:gap-2 justify-center font-sans font-extrabold">
                <span className="text-lg sm:text-xl">TRX</span>
                <svg
                  fill="white"
                  className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:rotate-12"
                  version="1.1"
                  viewBox="0 0 512 512"
                  aria-hidden="true"
                >
                  <path d="M461.77,136.212c2.028-14.416-2.312-29.563-13.405-40.648c-106.082-106.063-278.674-106.063-384.756,0 c-11.093,11.086-15.412,26.232-13.384,40.648C18.796,178.724,0,231.087,0,287.892v112c0,17.672,14.265,32.092,31.942,32.092H64 v31.908c0,17.672,14.282,32.092,31.958,32.092h48.013c17.676,0,32.029-14.42,32.029-32.092v-128 c0-17.674-14.353-31.908-32.029-31.908H95.958C78.282,303.983,64,318.218,64,335.892v-48c0-41.168,13.123-79.258,35.273-110.551 c11.722-0.41,23.314-4.957,32.258-13.902c68.643-68.609,180.314-68.609,248.957,0c8.944,8.945,20.52,13.492,32.242,13.902 C434.88,208.634,448,246.724,448,287.892v48c0-17.674-14.282-31.908-31.958-31.908h-48.013c-17.676,0-32.029,14.234-32.029,31.908 v128c0,17.672,14.353,32.092,32.029,32.092h48.013c17.676,0,31.958-14.42,31.958-32.092v-31.908h32.058 c17.676,0,31.942-14.42,31.942-32.092v-112C512,231.087,493.2,178.724,461.77,136.212z"></path>
                </svg>
              </div>
            </Link>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              {/* Favorites Button */}
              <button
                onClick={notify}
                className="p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 active:scale-95"
                aria-label="Favorites"
              >
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>

              {/* User Account Button */}
              <button
                onClick={notify}
                className="p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 active:scale-95"
                aria-label="Account"
              >
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setshowCart(true)}
                className="relative p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 active:scale-95"
                aria-label="Shopping Cart"
              >
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                
                {/* Cart Badge */}
                {totalQuantities > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] sm:text-xs font-bold h-4 w-4 sm:h-5 sm:w-5 rounded-full flex items-center justify-center border-2 border-white">
                    {totalQuantities > 9 ? '9+' : totalQuantities}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      {showCart && <Cart />}
    </>
  );
};

export default Navbar;
