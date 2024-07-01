'use client'
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CreateProduct } from '@/components/ProductForm/CreateProduct';
import Sider from './SIDE/Sider';
import Content from './Content/Content';
import Button from '@/components/Button/Button';
import TableComponent from '@/components/Table/Table';
import EditProductModal from './EditProductModal/EditProductModal';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  gender: string;
  active: boolean;
  size: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

const Dashboard: React.FC = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [selectedKey, setSelectedKey] = useState('products');
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch('http://localhost:3002/admin/products')
      .then((response) => response.json())
      .then((data: Product[]) => setProductsData(data));
  }, []);


  const productsColumns = [
    { title: 'ID', dataIndex: 'id' as keyof Product },
    { title: 'Nombre', dataIndex: 'name' as keyof Product },
    { title: 'Descripción', dataIndex: 'description' as keyof Product },
    { title: 'Precio', dataIndex: 'price' as keyof Product },
    { title: 'Stock', dataIndex: 'stock' as keyof Product },
    {
      title: 'Acciones',
      render: (record: Product) => (
        <span>
          <Button type="primary" onClick={() => handleEdit(record)}>Editar</Button>
          <Button type="danger" onClick={() => handleDelete(record.id)}>Eliminar</Button>
        </span>
      ),
    },
  ];

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: number) => {
    fetch(`http://localhost:3002/products/delete/${id}`, { method: 'DELETE' })
      .then(() => {
        setProductsData(productsData.filter((product) => product.id !== id));
      })
      .catch(console.error);
  };

  const handleSave = (updatedProduct: Product) => {
    fetch(`http://localhost:3002/products/edit/${updatedProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    })
    .then(() => {
      setProductsData(productsData.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)));
      setIsEditModalOpen(false);
    })
    .catch(console.error);
  };

  return (
    <Router>
      <div className="dashboard">
        <Sider defaultSelectedKey={selectedKey} onSelectedKeyChange={setSelectedKey} />
        <Content>
          {showCreateProduct ? <CreateProduct /> : (
            <>
              {selectedKey === 'products' && (
                <div>
                  <h2>Productos</h2>
                  <Button type="primary" onClick={() => setShowCreateProduct(true)}>Crear Producto</Button>
                  <TableComponent
                    data={productsData}
                    columns={productsColumns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              )}
              {/* Define other sections for users, orders, and categories */}
            </>
          )}
          <EditProductModal
            product={selectedProduct}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleSave}
          />
        </Content>
      </div>
    </Router>
  );
};

export default Dashboard;


