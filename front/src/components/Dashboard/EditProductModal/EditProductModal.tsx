import React, { useEffect, useState } from 'react';
import style from './EditProductModal.module.css'

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

interface EditProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
}
interface Category {
    id: number;
    name: string;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ product, isOpen, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = useState<Product | null>(product);
  const [categories, setCategories] = useState<Category[]>([]);
  
  useEffect(() => {
    setEditedProduct(product);
  }, [product]);
  useEffect(() => {
    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:3002/categories/');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    fetchCategories();
}, []);
  if (!isOpen || !product) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => (prevProduct ? { ...prevProduct, [name]: value } : null));
  };

  const handleSave = () => {
    if (editedProduct) {
      onSave(editedProduct);
    }
  };


  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContent}>
        <h2>Editar Producto</h2>
        <input
          type="text"
          name="name"
          value={editedProduct?.name || ''}
          onChange={handleChange}
          placeholder="Nombre"
        />
        <input
          type="text"
          name="description"
          value={editedProduct?.description || ''}
          onChange={handleChange}
          placeholder="Descripción"
        />
        <input
          type="number"
          name="price"
          value={editedProduct?.price || 0}
          onChange={handleChange}
          placeholder="Precio"
        />
        <input
          type="number"
          name="stock"
          value={editedProduct?.stock || 0}
          onChange={handleChange}
          placeholder="Stock"
        />
        <label htmlFor="">Filtro por categoría: </label>
            <select
                
                className='text-black'
            >
                <option className='text-black' value="">Seleccionar categoría</option>
                {categories.map((category) => (
                    <option key={category.id} className='text-black' value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        {/* Agrega más campos según sea necesario */}
        <button onClick={handleSave}>Guardar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default EditProductModal;
