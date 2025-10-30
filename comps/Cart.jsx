"use client";
import React, { useContext, useRef, useEffect } from "react";

import toast from "react-hot-toast";
import getStripe from "../lib/getStripe";
import { urlFor } from "../lib/client";
import { UC } from "../app/context";
import { ArrowLeft, Delete, Minus, Plus, ShoppingBag } from "./Svg";

const Cart = () => {
  // USE REF
  const cartRef = useRef(null);

  // CONTEXT STATES
  const {
    setshowCart,
    cartItems,
    totalPrice,
    totalQuantities,
    toggleCartItemQuantity,
    onRemove,
  } = useContext(UC);

  const checkOut = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === "500") return;

    const data = await response.json();

    toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  // Close cart on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current) {
        const cartPanel = cartRef.current.querySelector('.cart-panel');
        if (cartPanel && !cartPanel.contains(event.target)) {
          setshowCart(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setshowCart]);

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end"
      ref={cartRef}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0" 
        onClick={() => setshowCart(false)}
      />
      
      {/* Cart Panel */}
      <div
        className="cart-panel relative bg-white h-full w-full sm:w-96 md:w-[28rem] shadow-2xl overflow-hidden flex flex-col animate-slide-in"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-green-600 h-16 sm:h-20 flex items-center px-4 sm:px-6 shadow-md">
          <button 
            className="flex items-center gap-2 sm:gap-3 text-white hover:scale-105 active:scale-95 transition-transform" 
            onClick={() => setshowCart(false)}
          >
            <ArrowLeft styles="h-5 w-5 sm:h-6 sm:w-6" />
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-semibold">Your Cart</span>
              <span className="text-xs sm:text-sm text-white/90">
                {totalQuantities} {totalQuantities === 1 ? 'item' : 'items'}
              </span>
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* === IF CART IS EMPTY  */}
          {cartItems.length < 1 && (
            <div className="flex flex-col items-center justify-center h-full px-6">
              <div className="bg-gray-100 p-6 rounded-full mb-6">
                <ShoppingBag styles="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">
                Your shopping bag is empty
              </h3>
              <p className="text-sm text-gray-500 mb-8 text-center">
                Add some amazing headphones to your cart
              </p>
              <button
                className="w-full max-w-xs rounded-lg py-3 px-6 bg-primary text-white font-semibold hover:bg-green-600 active:scale-95 transition-all duration-200 shadow-lg"
                onClick={() => setshowCart(false)}
              >
                Continue Shopping
              </button>
            </div>
          )}

          {/* === SHOW PRODUCTS IN CART */}
          {cartItems.length >= 1 && (
            <div className="px-3 sm:px-4 py-4 space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item._id} 
                  className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex gap-3 sm:gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={urlFor(item?.image[0])}
                        alt={item?.name}
                        className="h-20 w-20 sm:h-24 sm:w-24 object-cover bg-gray-100 rounded-lg"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      {/* Name & Price */}
                      <div>
                        <h4 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 mb-1">
                          {item?.name}
                        </h4>
                        <p className="text-base sm:text-lg font-bold text-gray-900">
                          ${item?.price}
                        </p>
                      </div>

                      {/* Quantity Controls & Remove */}
                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                          <button
                            className="p-1.5 sm:p-2 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                            onClick={() => toggleCartItemQuantity(item._id, "dec")}
                            aria-label="Decrease quantity"
                          >
                            <Minus styles="h-4 w-4 text-gray-700" />
                          </button>
                          <span className="text-sm sm:text-base font-semibold text-gray-900 px-2 sm:px-3 min-w-[2rem] text-center">
                            {item?.quantity}
                          </span>
                          <button
                            className="p-1.5 sm:p-2 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                            onClick={() => toggleCartItemQuantity(item._id, "inc")}
                            aria-label="Increase quantity"
                          >
                            <Plus styles="h-4 w-4 text-gray-700" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => onRemove(item)}
                          className="p-2 hover:bg-red-50 active:bg-red-100 rounded-lg transition-colors"
                          aria-label="Remove item"
                        >
                          <Delete styles="h-5 w-5 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* === FOOTER - SUBTOTAL & PAY  */}
        {cartItems.length >= 1 && (
          <div className="border-t border-gray-200 bg-white p-4 sm:p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-lg sm:text-xl font-semibold text-gray-700">Subtotal:</span>
              <span className="text-xl sm:text-2xl font-bold text-gray-900">${totalPrice}</span>
            </div>

            {/* Checkout Button */}
            <button
              className="w-full bg-gradient-to-r from-primary to-green-600 text-white text-base sm:text-lg font-bold py-3 sm:py-4 rounded-xl hover:from-green-600 hover:to-primary active:scale-95 transition-all duration-200 shadow-lg"
              onClick={checkOut}
            >
              PAY WITH STRIPE
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Cart;
