import React from 'react';
import styles from './Card.module.css'
import ButtonCart from '@/components/ButtonCart/ButtonCart'

interface Product {
  id: number;
  name: string;
  size: string;
  color: string;
  price: number;
  imageUrl: string;
}


const ProductCard: React.FC<Product> = ({ id, name, price, imageUrl }) => {
    return (
      <div className={styles.card} key={id}>
        <div className={styles.imageContainer}>
          <img src="https://i.ibb.co/LZzKHF2/porsche-zoom2-1.jpg" alt={name} className="image" />
        </div>
        <div className={styles.title}>
          <h2 className={styles.productName}>{name}TERRIBLE AUTITO</h2>
        </div>
        <div className={styles.action}>
          <div className={styles.price}>
            <span>{price}$200</span>
          </div>
          <ButtonCart/>
        </div>
      </div>
    );
  };

  export default ProductCard