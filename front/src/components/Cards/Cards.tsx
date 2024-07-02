"use client";

import React, { useEffect, useState } from 'react';
import Card from '@/components/Card/Card';
import Style from "./Cards.module.css";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
}

interface CardsProps {
  products: Product[];
}

const Cards: React.FC<CardsProps> = ({products}) => {

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 15;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className={Style.cardContainer}>
        {selectedProducts.map(product => (
          <Card
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.images[0]}
          />
        ))}
      </div>
      <div className={Style.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={index + 1 === currentPage ? Style.activePage : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Cards;