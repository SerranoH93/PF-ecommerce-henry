"Use client"

import React from 'react';
import Image from 'next/image';
import styles from './Card.module.css'
import ButtonCart from '@/components/ButtonCart/ButtonCart'
import estrellitas from '@/assets/estrellita.png'
import Link from 'next/link';
interface ProductCard {
  id: string;
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
        <h2 className={styles.productName}>{name}</h2>
      </div>
      <div className={styles.punctuation}>
        <Image src={estrellitas} alt='punctuation' className={styles.estrellita} />
        <Image src={estrellitas} alt='punctuation' className={styles.estrellita} />
        <Image src={estrellitas} alt='punctuation' className={styles.estrellita} />
        <Image src={estrellitas} alt='punctuation' className={styles.estrellita} />
        <p> 4/5</p>
      </div>
      <div className={styles.action}>
        <div className={styles.price}>
          <span>${price}</span>

        </div>
        <Link href={`/productDetail/${id}`} passHref>
          <ButtonCart />
        </Link>
      </div>
    </div>
  );
};

export default Card