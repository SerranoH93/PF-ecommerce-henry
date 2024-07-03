"use client";

import React from "react";
import Image from "next/image";
import ButtonCart from "@/components/ButtonCart/ButtonCart";
import Link from "next/link";

interface ProductCard {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const Card: React.FC<ProductCard> = ({ id, name, price, imageUrl }) => {
  return (
    <div
      className="relative flex flex-col gap-3 p-4 w-56 h-86 bg-gray-800 rounded-lg m-1.5"
      key={id}
    >
      <Link href={`/productDetail/${id}`} passHref>
        <div className="relative overflow-hidden cursor-pointer w-full h-40 bg-purple-800 rounded-md">
          <Image
            src={imageUrl}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
      </Link>
      <div className="overflow-hidden w-full text-lg font-semibold text-gray-200 capitalize truncate">
        <h2>{name}</h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-lg font-bold text-gray-200">${price}</div>
        <Link href={`/productDetail/${id}`} passHref>
          <ButtonCart />
        </Link>
      </div>
    </div>
  );
};

export default Card;
