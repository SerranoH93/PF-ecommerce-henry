import React, { useEffect, useState } from 'react';
import Card from '@/components/Card/Card'
import Style from "./Cards.module.css";


// interface ProductContainerProps{
//   products: Product[];
// }
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}



const Cards: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Aquí deberías reemplazar la URL por la de tu API real
    fetch('https://api.example.com/products')
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

  return (
    <div className="card-container">
      {products.map(product => (
        <Card
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          imageUrl={product.imageUrl}
        />
      ))}
    </div>
  );
};

export default Cards;