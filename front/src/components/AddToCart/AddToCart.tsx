"use client";
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
      console.log(userData);

      const orden = {
        product,
        quantity,
        user: userData,
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
      <button onClick={handleAdd}>Agregar al Carrito</button>
      {showLoginMessage && (
        <div>
          <p>
            Para agregar productos al carrito{" "}
            <Link href="/api/auth/login">inicie sesión</Link>.
          </p>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
