'use client'
import React from 'react';
import styles from './Sider.module.css';

interface SiderProps {
  handleMenuClick: (key: 'products' | 'categories') => void;
}

const Sider: React.FC<SiderProps> = ({ handleMenuClick }) => {
  return (
    <div className={styles.sider}>
      <ul>
        <li onClick={() => handleMenuClick('products')}>Productos</li>
        <li onClick={() => handleMenuClick('categories')}>Categorías</li>
        {/* <li onClick={() => handleMenuClick('users')}>usuarios</li>
        <li onClick={() => handleMenuClick('orders')}>ordenes</li> */}
        {/* Añade más ítems del menú según sea necesario */}
      </ul>
    </div>
  );
};

export default Sider;


