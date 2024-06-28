'use client'
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Sider from '@/components/Layout/Sider/Sider';
import Content from '@/components/Layout/Content/Content';
import Button from '@/components/Button/Button';
import TableComponent from '@/components/Table/Table';

const Dashboard: React.FC = () => {
  const [productsData, setProductsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/admin/products')
      .then((response) => response.json())
      .then((data) => setProductsData(data));

    fetch('http://localhost:3000/admin/users')
      .then((response) => response.json())
      .then((data) => setUsersData(data));

    fetch('http://localhost:3000/admin/orders')
      .then((response) => response.json())
      .then((data) => setOrdersData(data));

    // Dejé la llamada para categorías comentada hasta que la habiliten en el backend
    // fetch('http://localhost:3000/admin/categories')
    //   .then((response) => response.json())
    //   .then((data) => setCategoriesData(data));
  }, []);

  const productsColumns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Nombre', dataIndex: 'name' },
    { title: 'Descripción', dataIndex: 'description' },
    { title: 'Precio', dataIndex: 'price' },
    { title: 'Género', dataIndex: 'gender' },
    { title: 'Stock', dataIndex: 'stock' },
    { title: 'Activo', dataIndex: 'active' },
    { title: 'Tamaño', dataIndex: 'size' },
    { title: 'Imágenes', dataIndex: 'images' },
    { title: 'Fecha de Creación', dataIndex: 'createdAt' },
    { title: 'Fecha de Actualización', dataIndex: 'updatedAt' },
    { title: 'Fecha de Eliminación', dataIndex: 'deletedAt' },
    { title: 'ID de Categoría', dataIndex: 'category_id' },
    {
      title: 'Acciones',
      render: (record: any) => (
        <span>
          <Button type="primary">Editar</Button>
          <Button type="danger">Eliminar</Button>
        </span>
      ),
    },
  ];

  const usersColumns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Nombre', dataIndex: 'name' },
    { title: 'Apodo', dataIndex: 'nickname' },
    { title: 'Foto', dataIndex: 'picture' },
    { title: 'Fecha de Creación', dataIndex: 'createdAt' },
    { title: 'Fecha de Actualización', dataIndex: 'updatedAt' },
    { title: 'Fecha de Eliminación', dataIndex: 'deletedAt' },
  ];

  const ordersColumns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Estado', dataIndex: 'status' },
    { title: 'Total', dataIndex: 'total' },
    { title: 'Método de Pago', dataIndex: 'paymentMethod' },
    { title: 'Fecha de Creación', dataIndex: 'createdAt' },
    { title: 'Fecha de Actualización', dataIndex: 'updatedAt' },
    { title: 'Fecha de Eliminación', dataIndex: 'deletedAt' },
    { title: 'ID de Usuario', dataIndex: 'user_id' },
    {
      title: 'Acciones',
      render: (record: any) => (
        <span>
          <Button type="primary">Editar</Button>
          <Button type="danger">Eliminar</Button>
        </span>
      ),
    },
  ];

  const categoriesColumns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Nombre', dataIndex: 'name' },
    { title: 'Descripción', dataIndex: 'description' },
    { title: 'Fecha de Creación', dataIndex: 'createdAt' },
    { title: 'Fecha de Actualización', dataIndex: 'updatedAt' },
    { title: 'Fecha de Eliminación', dataIndex: 'deletedAt' },
    {
      title: 'Acciones',
      render: (record: any) => (
        <span>
          <Button type="primary">Editar</Button>
          <Button type="danger">Eliminar</Button>
        </span>
      ),
    },
  ];

  return (
    <Router>
      <div className="dashboard">
        <Sider defaultSelectedKey="products" />
        <Content>
          <div>
            <h2>Productos</h2>
            <Button type="primary">Crear Producto</Button>
            <TableComponent data={productsData} columns={productsColumns} />
          </div>
          <div>
            <h2>Usuarios</h2>
            <TableComponent data={usersData} columns={usersColumns} />
          </div>
          <div>
            <h2>Órdenes</h2>
            <TableComponent data={ordersData} columns={ordersColumns} />
          </div>
          <div>
            <h2>Categorías</h2>
            <Button type="primary">Crear Categoría</Button>
            <TableComponent data={categoriesData} columns={categoriesColumns} />
          </div>
        </Content>
      </div>
    </Router>
  );
};

export default Dashboard;