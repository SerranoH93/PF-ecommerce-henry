import React from 'react';
import styles from './Table.module.css';

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

interface Column {
  title: string;
  dataIndex?: keyof Product;
  render?: (record: Product) => JSX.Element;
}

interface TableProps {
  data: Product[];
  columns: Column[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onCreate?: () => void;
}

const TableComponent: React.FC<TableProps> = ({ data, columns, onCreate, onDelete, onEdit }) => {
  return (
    <div className={styles.tableContainer}>
      {onCreate && (
        <button className={styles.createButton} onClick={onCreate}>
          Crear
        </button>
      )}
      <table className={styles.customTable}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.title}</th>
            ))}
            {/* <th>Acciones</th> */}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {column.render ? column.render(item) : item[column.dataIndex!]}
                </td>
              ))}
              {/* <td>
                <button className={styles.actionButton} onClick={() => onEdit(item)}>Editar</button>
                <button className={styles.actionButton} onClick={() => onDelete(item.id)}>Eliminar</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
