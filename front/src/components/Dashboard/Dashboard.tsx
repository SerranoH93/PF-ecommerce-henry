'use client'
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sider from './SIDE/Sider';
import Content from './Content/Content';
import Button from '@/components/Button/Button';
import TableComponent, { Column } from '@/components/Table/Table';
// import CreateProduct from '@/components/ProductForm/CreateProduct';
import Modal from './Modal';
import styles from './dashboard.module.css';
import CategoryTable from './CategoryTable/CategoryTable';
import CreateCategory from './CreateCategory/CreateCategory';

interface Product {
  id: string;
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
  category: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
}

const Dashboard: React.FC = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [selectedKey, setSelectedKey] = useState<'products' | 'categories'>('products');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3002/admin/products')
      .then(response => response.json())
      .then(data => setProductsData(data))
      .catch(error => console.error('Error fetching products:', error));

    fetch('http://localhost:3002/categories/')
      .then(response => response.json())
      .then(data => setCategoriesData(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleMenuClick = (key: 'products' | 'categories') => {
    setSelectedKey(key);
  };

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleCloseProductForm = () => {
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    fetch(`http://localhost:3002/products/delete/${id}`, { method: 'DELETE' })
      .then(() => {
        setProductsData(productsData.filter(product => product.id !== id));
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  const handleCreateCategory = () => {
    setEditingCategory(null);
    setShowCategoryForm(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setShowCategoryForm(true);
  };

  const handleCloseCategoryForm = () => {
    setShowCategoryForm(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id: number) => {
    fetch(`http://localhost:3002/categories/delete/${id}`, { method: 'DELETE' })
      .then(() => {
        setCategoriesData(categoriesData.filter(category => category.id !== id));
      })
      .catch(error => console.error('Error deleting category:', error));
  };

  const handleSaveCategory = (category: Category) => {
    const method = category.id ? 'PUT' : 'POST';
    const url = category.id ? `http://localhost:3002/categories/edit/${category.id}` : 'http://localhost:3002/categories/create';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    })
      .then(response => response.json())
      .then(savedCategory => {
        if (method === 'POST') {
          setCategoriesData([...categoriesData, savedCategory]);
        } else {
          setCategoriesData(categoriesData.map(cat => (cat.id === savedCategory.id ? savedCategory : cat)));
        }
      })
      .catch(error => console.error('Error saving category:', error));
  };

  const handleOpenModal = (imageUrl: string) => {
    setModalImage(imageUrl);
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  const transformProductToProductFormInputs = (editingProduct: Product | null): {
    id?: string;
    name: string;
    description: string;
    price: number;
    gender: string;
    stock: number;
    active: boolean;
    size: string | number;
    images: FileList;
    category: string;
  } | undefined => {
    if (!editingProduct) {
      return undefined;
    }

    // Simplemente inicializamos las imágenes como un FileList vacío
    const emptyFileList = new FileList();

    return {
      id: editingProduct.id,
      name: editingProduct.name,
      description: editingProduct.description,
      price: editingProduct.price,
      gender: editingProduct.gender,
      stock: editingProduct.stock,
      active: editingProduct.active,
      size: editingProduct.size,
      images: emptyFileList,
      category: editingProduct.category,
    };
  };

  const productColumns: Column<Product>[] = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Descripción', dataIndex: 'description', key: 'description' },
    { title: 'Precio', dataIndex: 'price', key: 'price' },
    { title: 'Stock', dataIndex: 'stock', key: 'stock' },
    { title: 'Género', dataIndex: 'gender', key: 'gender' },
    { title: 'Activo', dataIndex: 'active', key: 'active', render: (text, record) => <span>{record.active ? 'Sí' : 'No'}</span> },
    { title: 'Tamaño', dataIndex: 'size', key: 'size' },
    { 
      title: 'Imágenes', 
      key: 'images', 
      render: (text, record) => (
        <div>
          {record.images && record.images.length > 0 ? (
            record.images.map((image, index) => (
              <a key={index} href="#" onClick={() => handleOpenModal(image)}>Ver imagen</a>
            ))
          ) : (
            <span>No hay imágenes disponibles</span>
          )}
        </div>
      ),
    },
    { title: 'ID de Categoría', dataIndex: 'category', key: 'categoryId' },
    { title: 'Creado en', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Actualizado en', dataIndex: 'updatedAt', key: 'updatedAt' },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (text, record) => (
        <span>
          <Button type="button" onClick={() => handleEditProduct(record)}>Editar</Button>
          <Button type="button" onClick={() => handleDeleteProduct(record.id)}>Eliminar</Button>
        </span>
      ),
    },
  ];

  return (
    <Router>
      <div className={styles.dashboardContainer}>
        <Sider handleMenuClick={handleMenuClick} />
        <div className={styles.contentContainer}>
          <Content>
            {selectedKey === 'products' && (
              <>
                <div className={styles.header}>
                  <Button type="button" onClick={handleCreateProduct}>Crear Producto</Button>
                </div>
                <div className={styles.tableWrapper}>
                  <TableComponent
                    data={productsData}
                    onEdit={handleEditProduct}
                    columns={productColumns}
                    onDelete={handleDeleteProduct}
                  />
                </div>
              </>
            )}
            {selectedKey === 'categories' && (
              <>
                <div className={styles.header}>
                  <Button type="button" onClick={handleCreateCategory}>Crear Categoría</Button>
                </div>
                <CategoryTable
                  data={categoriesData}
                  onEdit={handleEditCategory}
                  onDelete={handleDeleteCategory}
                />
              </>
            )}
            {/* {showProductForm && (
              <CreateProduct
                categories={categoriesData}
                onClose={handleCloseProductForm}
                product={editingProduct ? transformProductToProductFormInputs(editingProduct) : undefined}
              />
            )} */}
            {/* {showCategoryForm && (
              <CreateCategory
                category={editingCategory}
                isOpen={showCategoryForm}
                onClose={handleCloseCategoryForm}
                onSave={handleSaveCategory}
              />
            )} */}
            {modalImage && (
              <Modal isOpen={!!modalImage} onClose={handleCloseModal}>
                <img src={modalImage} alt="Producto" />
              </Modal>
            )}
          </Content>
        </div>
      </div>
    </Router>
  );
};

export default Dashboard;