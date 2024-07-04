import React from 'react';
import styles from './Table.module.css';

interface Item {
  id: number;
  name: string;
  description?: string;
  [key: string]: any;
}

export interface Column<T> {
  title: string;
  dataIndex?: keyof T;
  key: string;
  render?: (_: any, record: T) => JSX.Element; // Ajustar para que acepte dos parámetros
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit: (item: T) => void;
  onDelete: (id: number) => void;
  onCreate?: () => void;
}

const TableComponent = <T extends Item>({ data, columns, onCreate, onDelete, onEdit }: TableProps<T>) => {
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
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {column.render ? column.render(null, item) : item[column.dataIndex!]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
