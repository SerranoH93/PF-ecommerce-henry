"use client";

import { useState, useEffect } from 'react';
import { useProductContext } from '@/context/productContex';
import styles from './ProductFilter.module.css'; 

const ProductFilter = () => {
  const { filters, setFilters, fetchProducts, products } = useProductContext();
  const [name, setName] = useState(filters.name || '');
  const [gender, setGender] = useState(filters.gender || '');
  const [category, setCategory] = useState(filters.category || '');

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleFilterChange = () => {
    setFilters({ name, gender, category });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className={styles.selectFilter}
      >
        <option value="">Selecciona Género</option>
        <option value="masculino">Masculino</option>
        <option value="femenino">Femenino</option>
      </select>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={styles.selectFilter}
      >
        <option value="">Selecciona Categoría</option>
        <option value="ropa">Ropa</option>
        <option value="zapatos">Zapatos</option>
        <option value="accesorios">Accesorios</option>
      </select>
      <button onClick={handleFilterChange}>Filtrar</button>

      <div className={styles.productList}>
        {Array.isArray(products) && products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className={styles.productItem}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>{product.gender}</p>
              <p>{product.category}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron productos</p>
        )}
      </div>
    </div>
  );
};

export default ProductFilter;