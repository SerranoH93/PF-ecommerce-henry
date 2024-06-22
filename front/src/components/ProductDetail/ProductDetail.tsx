import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './ProductDetail.module.css';

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  size: string;
  description: string;
  stock: number;
  gender: string;
}

const ProductDetail: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { query } = useRouter();
  const productId = query.id;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3002/products/${productId}`);
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue satisfactoria');
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!product) {
    return <p>Error: Producto no encontrado</p>;
  }

  return (
    <div className={styles.productDetail}>
      <Image src={product.images[0]} alt={product.name} width={500} height={500} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <p>Tamaño: {product.size}</p>
      <p>Género: {product.gender}</p>
      <p>Stock: {product.stock}</p>
    </div>
  );
};

export default ProductDetail;
