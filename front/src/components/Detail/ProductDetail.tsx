'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import styles from './ProductDetail.module.css';
import AddToCart from '../AddToCart/AddToCart';
import { useUser } from '@auth0/nextjs-auth0/client';

export interface Product {
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
  const { id } = useParams();
  const { user } = useUser();
  const quantity = 1;

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`http://localhost:3002/products/${id}`);
          if (!response.ok) {
            throw new Error("La respuesta de la red no fue satisfactoria");
          }
          const data: Product = await response.json();
          setProduct(data);
        } catch (error) {
          setError("Error al obtener el producto");
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <p className="text-white">Cargando...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!product) {
    return <p className="text-red-500">Error: Producto no encontrado</p>;
  }

  return (
    <div className="flex flex-col md:flex-row items-start border-4 border-black p-6 rounded-lg max-w-4xl mx-auto my-10 bg-gray-800 shadow-lg">
      <div className="w-full md:w-1/2 mb-6 md:mb-0">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={300}
          height={300}
          className="object-cover rounded-md"
        />
      </div>
      <div className={styles.productInfo}>
        <h1>Detalle del Producto</h1>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>Precio: ${product.price}</p>
        <p>Talle: {product.size}</p>
        <p>Género: {product.gender}</p>
        <p>Stock: {product.stock}</p>
        <AddToCart product={product} quantity={quantity} user={user}/>
      </div>
    </div>
  );
};

export default ProductDetail;
