"use client";

import React, { useEffect, useState } from 'react';
import Card from '@/components/Card/Card';
import Style from "./Cards.module.css";

interface Product {
  id: number;
  name: string;
  price: number;
  images: string;
}

const Cards: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

useEffect(() => {
  fetch('http://localhost:3002/products/')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error('Expected array but received:', data);
      }
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching products:', error);
      setLoading(false);
    });      
}, []);

if (loading) {
  return <p>Loading...</p>;
}

if (!Array.isArray(products)) {
  return <p>Error: Unexpected data format</p>;
}
console.log(products, 'Productos');

  return (
    <div className={Style.cardContainer}>
      {products.map(product => (
        <Card
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          imageUrl={product.images[0]}
        />
      ))}
    </div>
  );
};

export default Cards;
