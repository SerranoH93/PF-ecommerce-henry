import React from 'react';
import styles from './Card.module.css'
import ButtonCart from '@/components/ButtonCart/ButtonCart'

 interface ProductCard {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}


 const Card: React.FC<ProductCard> = ({ id, name, price, imageUrl }) => {
    return (
      <div className={styles.card} key={id}>
        <div className={styles.imageContainer}>
          <img src={imageUrl} alt={name} className="image" />
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

export default Card