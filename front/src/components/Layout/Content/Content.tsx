import React from 'react';
import styles from './styles/Content.module.css';

interface ContentProps {
  children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
  return <div className={styles.content}>{children}</div>;
};

export default Content;