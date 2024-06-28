
import React from 'react';
import { Link } from 'react-router-dom';
import styles from'./Sider.module.css';

interface SiderProps {
  defaultSelectedKey: string;
}

const Sider: React.FC<SiderProps> = ({ defaultSelectedKey }) => {
  return (
    <div className={styles.sider}>
      <div className={styles.logo}>Logo</div>
      <ul className={styles.menu}>
        <li className={defaultSelectedKey === 'products' ? 'active' : ''}>
          <Link to="/admin/products">Productos</Link>
        </li>
        <li className={defaultSelectedKey === 'users' ? 'active' : ''}>
          <Link to="/admin/users">Usuarios</Link>
        </li>
        <li className={defaultSelectedKey === 'orders' ? 'active' : ''}>
          <Link to="/admin/orders">Órdenes</Link>
        </li>
        <li className={defaultSelectedKey === 'categories' ? 'active' : ''}>
          <Link to="/admin/categories">Categorías</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sider;

