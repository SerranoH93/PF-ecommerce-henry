/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './ProductDetail.module.css';

interface Product {
  id: string;
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
  const [error, setError] = useState<string | null>(null);
 const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`http://localhost:3002/products/${id}`);
          if (!response.ok) {
            throw new Error('La respuesta de la red no fue satisfactoria');
          }
          const data: Product = await response.json();
          setProduct(data);
        } catch (error) {
          setError('Error al obtener el producto');
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  console.log('Product:', product);
  console.log('Loading:', loading);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Error: Producto no encontrado</p>;
  }

  return (
    <div className={styles.productDetail}>
      <h1>Detalle del Producto</h1>
      <Image src={product.images[0]} alt={product.name} width={500} height={500} />
      <p>ID: {product.id}</p>
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