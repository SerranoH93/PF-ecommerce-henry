import React, { FC, useState } from "react";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import { Product } from "../Detail/ProductDetail";
import Link from "next/link";

interface ButtonCartProps {
  product: Product;
  quantity: number;
  user?: UserProfile | undefined;
}

const AddToCart: FC<ButtonCartProps> = ({ product, quantity, user }) => {
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const userEmail = user?.email;

  const handleAdd = async () => {
    if (!user) {
      setShowLoginMessage(true);
      return;
    }

    const link = "http://localhost:3002/order/add";
    try {
      const userDb = await axios.get(
        `http://localhost:3002/user/by-email?email=${userEmail}`
      );

      const userData = userDb.data;
      const userId = userData.id;
      console.log(userData);

      const orden = {
        product,
        quantity,
        user: userData,
        userId,
      };
      console.log("Enviando datos:", orden);

      const sendToCart = await axios.post(
        link,
        { orden },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(sendToCart);
    } catch {
      console.error("no enviado");
    }
  };

  return (
    <div>
      <button
        onClick={handleAdd}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Agregar al Carrito
      </button>
      {showLoginMessage && (
        <div className="mt-2">
          <p className="text-white">
            Para agregar productos al carrito{" "}
            <Link href="/api/auth/login">
              <span className="underline">inicie sesión.</span>
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
