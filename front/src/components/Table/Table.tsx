import React from 'react';
import styles from './Table.module.css';

interface Item {
  id: string;
  name: string;
  description?: string;
  [key: string]: any;
}

interface CategoryItem extends Item {
  id: string; // Asegúrate de que el id sea string
}

export interface Column<T> {
  title: string;
  dataIndex?: keyof T;
  key: string;
  render?: (_: any, record: T) => JSX.Element; 
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit: (item: T) => void;
  onDelete: (id: string) => void;
  onCreate?: () => void;
}

const TableComponent = <T extends Item | CategoryItem>({ data, columns, onCreate, onDelete, onEdit }: TableProps<T>) => {
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
                  {column.render ? column.render(null, item) : item[column.dataIndex!]?.toString()}
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

