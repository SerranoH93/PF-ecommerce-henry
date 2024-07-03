"use client";

import React, { useEffect, useState } from 'react';

export default function Carousel() {
  const images = [
    "https://static.vecteezy.com/system/resources/thumbnails/039/043/718/small_2x/ai-generated-vibrant-youth-embracing-street-style-in-urban-setting-photo.jpg",
    "https://images.pexels.com/photos/5625040/pexels-photo-5625040.jpeg",
    "https://i.pinimg.com/564x/45/83/f1/4583f1beb845ab5fdc96231000e686c5.jpg",
    "https://i2.wp.com/q2textil.de/wp-content/uploads/2018/08/new-lad-moda-sem-censura-alex-cursino-blog-de-moda-fashion-blogger-john-sato-moda-sem-censura-style-estilo-fashion-tips-menswear-moda-masculina-estilo-masculino-tendencia-masculina-2.jpg",
  ];
  const [img, setImg] = useState(0);

  function next() {
    if (img < images.length - 1) setImg(img + 1);
    else setImg(0);
  }

  function back() {
    if (img > 0) setImg(img - 1);
    else setImg(images.length - 1);
  }

  useEffect(() => {
    const time = setTimeout(next, 6000);
    return () => clearTimeout(time);
  }, [img]);

  return (
    <div className='mt-3 mx-2'>
      <div className="relative mx-auto bg-[var(--color1)] min-h-[35vw] h-20 max-w-full">
        <img key={img} src={images[img]} className="w-full max-h-[35vw] object-cover mx-auto block transition-opacity duration-2000  rounded" />

        <a className="absolute top-1/2 left-0 transform -translate-y-1/2 p-4 text-white font-bold text-lg cursor-pointer transition ease-in-out duration-600 hover:bg-black/80 rounded-r" onClick={back}>
          &#10094;
        </a>
        <a className="absolute top-1/2 right-0 transform -translate-y-1/2 p-4 text-white font-bold text-lg cursor-pointer transition ease-in-out duration-600 hover:bg-black/80 rounded-l" onClick={next}>
          &#10095;
        </a>
        <div className="absolute top-[90%] left-0 right-0 mx-auto text-center">
          {images.length ?
            images.map((e, k) => (
              <span
                key={k}
                className={`cursor-pointer h-4 w-4 mx-1 bg-gray-400 rounded-full inline-block transition ease-in-out duration-600 ${img === k ? 'bg-gray-600' : ''}`}
                onClick={() => setImg(k)}
              ></span>
            )) :
            <p>Image not found</p>
          }
        </div>
      </div>
    </div>
  );
}