"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Card.module.css';
import ButtonCart from '@/components/ButtonCart/ButtonCart';
import estrellitas from '@/assets/estrellita.png';

interface ProductCard {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  gender: string;
  size: number;
  stock: number;
}

const Card: React.FC<ProductCard> = ({ id, name, price, image }) => {
  return (
    <div className={styles.card} key={id}>
      <div className={styles.imageContainer}>
        <Image src={image} alt={name} width={300} height={300} className="image" />
      </div>
      <div className={styles.title}>
        <h2 className={styles.productName}>{name}</h2>
      </div>
      <div className={styles.punctuation}>
        <Image src={estrellitas} alt="punctuation" width={20} height={20} className={styles.estrellita} />
        <Image src={estrellitas} alt="punctuation" width={20} height={20} className={styles.estrellita} />
        <Image src={estrellitas} alt="punctuation" width={20} height={20} className={styles.estrellita} />
        <Image src={estrellitas} alt="punctuation" width={20} height={20} className={styles.estrellita} />
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

export default Card;
