'use client'
import React, { useState, useEffect } from 'react';
import { Category } from '@/types';
import Button from '@/components/Button/Button';
import Modal from '../Modal';
import styles from './CreateCategory.module.css';

interface CreateCategoryProps {
  category?: Category | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: Category) => void;
}

const CreateCategory: React.FC<CreateCategoryProps> = ({ category, isOpen, onClose, onSave }) => {
  const [name, setName] = useState(category?.name || '');
  const [description, setDescription] = useState(category?.description || '');

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: category?.id || 0, name, description });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className={styles.formActions}>
          <Button  type="submit">Guardar</Button>
          <Button  type="button" onClick={onClose}>Cancelar</Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateCategory;
