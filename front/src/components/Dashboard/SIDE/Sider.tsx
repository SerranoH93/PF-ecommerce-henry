import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sider.module.css';

interface SiderProps {
  defaultSelectedKey: string;
  onSelectedKeyChange: (key: string) => void;
}

const Sider: React.FC<SiderProps> = ({ defaultSelectedKey, onSelectedKeyChange }) => {
  return (
    <div className={styles.sider}>
      <ul className={styles.menu}>
        <li className={defaultSelectedKey === 'products' ? 'active' : ''}>
          <Link to="#" onClick={() => onSelectedKeyChange('products')}>Productos</Link>
        </li>
        <li className={defaultSelectedKey === 'users' ? 'active' : ''}>
          <Link to="#" onClick={() => onSelectedKeyChange('users')}>Usuarios</Link>
        </li>
        <li className={defaultSelectedKey === 'orders' ? 'active' : ''}>
          <Link to="#" onClick={() => onSelectedKeyChange('orders')}>Órdenes</Link>
        </li>
        <li className={defaultSelectedKey === 'categories' ? 'active' : ''}>
          <Link to="#" onClick={() => onSelectedKeyChange('categories')}>Categorías</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sider;