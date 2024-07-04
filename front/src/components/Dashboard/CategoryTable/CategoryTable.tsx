'use client'
import React from 'react';
import { Category } from '@/types';
import TableComponent  from '@/components/Table/Table';
import Button from '@/components/Button/Button';

interface CategoryTableProps {
  data: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({ data, onEdit, onDelete }) => {
  const columns = [
    { title: 'ID', dataIndex: 'id' as keyof Category, key: 'id' },
    { title: 'Nombre', dataIndex: 'name' as keyof Category, key: 'name' },
    { title: 'Descripción', dataIndex: 'description' as keyof Category, key: 'description' },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (text: any, record: Category) => (
        <span>
          <Button type="button" onClick={() => onEdit(record)}>Editar</Button>
          <Button type="button" onClick={() => onDelete(record.id)}>Eliminar</Button>
        </span>
      ),
    },
  ];

  return (
    <TableComponent
      data={data}
      columns={columns}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

export default CategoryTable;
