"use client";

import React, { useEffect, useState } from 'react';
import Card from '@/components/Card/Card';
import Style from "./Cards.module.css";

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
}

const Cards: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 18;

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3002/products/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (isMounted) {
          if (Array.isArray(data)) {
            setProducts(data);
          } else {
            console.error('Expected array but received:', data);
          }
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching products:', error);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!Array.isArray(products)) {
    return <p>Error: Unexpected data format</p>;
  }

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