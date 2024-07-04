import React from 'react';
import { Category } from '@/types';
import CreateCategory from '../CreateCategory/CreateCategory';

interface EditCategoryModalProps {
  category: Category | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: Category) => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({ category, isOpen, onClose, onSave }) => {
  return (
    <CreateCategory
      category={category}
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
    />
  );
};

export default EditCategoryModal;
