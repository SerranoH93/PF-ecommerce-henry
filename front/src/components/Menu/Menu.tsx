
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.css';

interface MenuProps {
  defaultSelectedKey: string;
}

const Menu: React.FC<MenuProps> = ({ defaultSelectedKey }) => {
  return (
    <nav className="menu">
      <ul>
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
    </nav>
  );
};

export default Menu;

