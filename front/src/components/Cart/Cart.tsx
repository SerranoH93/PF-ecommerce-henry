"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface CartProduct {
  id: number;
  product_id: string;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
}

interface MappedProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart = () => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const fetchCartProducts = async () => {
      const linkGetCartProducts = "http://localhost:3002/order";

      try {
        const response = await axios.get(linkGetCartProducts);
        const cartProducts = response.data;
        setCartProducts(cartProducts);

        // Obtener los detalles de cada producto en el carrito
        const productRequests = cartProducts.map((cartProduct: CartProduct) =>
          axios.get(`http://localhost:3002/products/${cartProduct.product_id}`)
        );

        const productResponses = await Promise.all(productRequests);
        const productsData = productResponses.map((response) => response.data);
        setProducts(productsData);
      } catch (error) {
        console.error("Error al traer los productos del carrito", error);
      }
    };

    fetchCartProducts();
  }, []);

  useEffect(() => {
    // Calcular el total de la compra cuando cambien los productos o el carrito
    const calculateTotalPrice = () => {
      const totalPrice = products.reduce((acc, product, index) => {
        const cartProduct = cartProducts[index];
        const mappedProductPrice = product.price * cartProduct.quantity;
        return acc + mappedProductPrice;
      }, 0);
      setTotalPrice(totalPrice);
    };

    calculateTotalPrice();
  }, [products, cartProducts]);

  const mapProductInfo = (
    product: Product,
    cartProduct: CartProduct
  ): MappedProduct => {
    const { id, name, price, images } = product;

    return {
      id: cartProduct.id,
      name,
      price,
      image: images[0], // Suponiendo que siempre tomamos la primera imagen
      quantity: cartProduct.quantity,
    };
  };
  const handlePay =  async (order) => {
    
    const res = await fetch( 'http://localhost:3002/checkout' , {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "content-Type": "application/json"
      }
    })
  }

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Carrito</h1>

        {products.length > 0 && (
          <div>
            {products.map((product, index) => {
              const cartProduct = cartProducts[index];
              const mappedProduct: MappedProduct = mapProductInfo(
                product,
                cartProduct
              );

              return (
                <div
                  key={mappedProduct.id}
                  className="bg-gray-800 rounded-lg p-4 mb-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 relative">
                        <Image
                          src={mappedProduct.image}
                          alt={mappedProduct.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold">
                          {mappedProduct.name}
                        </h2>
                        <p className="text-gray-400">
                          Cantidad: {mappedProduct.quantity}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">
                        ${mappedProduct.price}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="bg-gray-800 rounded-lg p-4 mt-8">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">Total a Pagar:</h2>
                <p className="text-xl font-semibold">${totalPrice}</p>
              </div>
            </div>
            <div>
            <button
            className='bg-green-500 text-white px-4 py-2 rounded-md mt-4 w-full'
            onClick={() => handlePay(order)}
          >Pagar</button>
            </div>

          </div>
        )}

        {products.length === 0 && <p className="text-lg">Loading...</p>}
      </div>
    </div>
  );
};

export default Cart;
