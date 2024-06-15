import React from "react";
import ProductCard from "../Card/Card";

interface Product {
  id: number;
  name: string;
  size: string;
  color: string;
  price: number;
  imageUrl: string;
}

interface ProductContainerProps{
  products: Product[];
}

// Componente contenedor de productos
const ProductContainer: React.FC<ProductContainerProps> = ({ products }) => {
  return (
    <div className="product-container">
      {products.map(product => (
        <ProductCard 
          key={product.id}
          id={product.id}
          name={product.name}
          size={product.size}
          color={product.color}
          price={product.price}
          imageUrl={product.imageUrl}
        />
      ))}
    </div>
  );
};

export default ProductContainer;