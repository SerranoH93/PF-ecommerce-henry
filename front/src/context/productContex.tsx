"use client";  // Añadir esta línea

import { createContext, useContext, useState, ReactNode } from 'react';
import { getFilteredProducts } from '@/service/api';

interface Product {
  id: number;
  name: string;
  gender: string;
  category: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

interface ProductContextProps {
  products: Product[];
  filters: { name?: string; gender?: string; category?: string };
  setFilters: (filters: { name?: string; gender?: string; category?: string }) => void;
  fetchProducts: () => void;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<{ name?: string; gender?: string; category?: string }>({});

  const fetchProducts = async () => {
    const data = await getFilteredProducts(filters);
    console.log("data:",data)
    setProducts(data);
  };

  return (
    <ProductContext.Provider value={{ products, filters, setFilters, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext debe ser usado dentro de un ProductProvider');
  }
  return context;
};