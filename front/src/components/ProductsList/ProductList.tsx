
"use client";  

import { useProductContext } from '@/context/productContex';

const ProductList = () => {
  const { products } = useProductContext();

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.gender}</p>
          <p>{product.category}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;