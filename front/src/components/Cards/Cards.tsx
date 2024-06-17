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
    // Aquí deberíamos reemplazar la URL por la de tu API real
    fetch('http://localhost:3002/products/')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
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

  console.log(products, 'Productos')

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