"use client"

import React, { useEffect, useState } from 'react'
import style from '../Carousel/Carousel.module.css'
//made by fr


export default function Carousel() {

  const images = [
    "https://i.pinimg.com/564x/e4/fd/ff/e4fdffa14b80d38a2de883c093d5c6c8.jpg",
    "https://images.pexels.com/photos/5625040/pexels-photo-5625040.jpeg",
    "https://i.ibb.co/85jswKW/pexels-sourav-mishra-2710043-2.jpg",
    "https://i.ibb.co/cvdLnCv/pexels-brett-sayles-1592261-2-1.jpg",
  ]
  const [img, setImg] = useState(0)

  function next() {
    if (img < images.length - 1) setImg(img + 1)
    else setImg(0)
  }

  function back() {
    if (img > 0) setImg(img - 1)
    else setImg(images.length - 1)
  }

  useEffect(() => {
    const time = setTimeout(next, 6000)
    return () => clearTimeout(time)
  }, [img])

  return (
    <div>
      <div className={style.slideshowContainer}>

        <img key={img} src={images[img]} className={`${style.img} ${style.fade}`} />

        <a className={style.prev} onClick={back}>&#10094;</a>
        <a className={style.next} onClick={next}>&#10095;</a>
        <div className={style.dotContainer}>
          {images.length ?
            images.map((e, k) =>
              <span key={k + 1} className={img !== k ? style.dot : style.activeDot} onClick={() => setImg(k)}></span>
            )
            :
            <p>Image not found</p>
          }
        </div>
      </div>


    </div>
  )
}