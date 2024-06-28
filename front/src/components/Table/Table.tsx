// TableComponent.tsx

import React from 'react';
import styles from './Table.module.css';  

interface TableProps {
  data: any[]; // Datos para la tabla
  columns: any[]; // Columnas de la tabla
  onCreate?: () => void; // Función para crear elementos (opcional)
}

const TableComponent: React.FC<TableProps> = ({ data, columns, onCreate }) => {
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{item[column.dataIndex]}</td>
              ))}
              <td>
                <button className={styles.actionButton}>Editar</button>
                <button className={styles.actionButton}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
