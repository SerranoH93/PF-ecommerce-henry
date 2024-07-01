
import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

interface ButtonProps {
  type: 'primary' | 'danger';
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type, onClick, children }) => {
  return (
    <button className={classNames(styles.btn, styles[`btn-${type}`])} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
