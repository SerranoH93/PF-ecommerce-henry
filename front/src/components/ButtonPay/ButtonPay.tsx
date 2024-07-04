"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51PVx00CRx9u6cZBxtTBfWTyf5b5VfJdwTub8aoRbb2N7OqwZTxr33aPgL0B8kvAhy475sF3lGhtjFsaJGzbfhhUP00yzZChe7p");

interface ButtonPayProps {
  cartProducts: any[];
  totalPrice: number;
}

const ButtonPay = ({ cartProducts, totalPrice }: ButtonPayProps) => {
  const handleCheckout = async () => {
    try {
      const response = await axios.post("https://pf-ecommerce-henry.onrender.comorder/create-checkout-session", {
        cartProducts,
        totalPrice,
      });

      const { sessionId } = response.data;
      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error("Error in redirecting to checkout:", error);
        } else {
          const clearCart = await axios.delete("https://pf-ecommerce-henry.onrender.comorder/deleteAll")
        }
      }
    } catch (error) {
      console.error("Error in handleCheckout:", error);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
    >
      Pagar
    </button>
  );
};

export default ButtonPay;
