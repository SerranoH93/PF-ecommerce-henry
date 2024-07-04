"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import ButtonPay from "../ButtonPay/ButtonPay";

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
  const { user } = useUser();
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (!user) return;

    const fetchCartProducts = async () => {
      try {
        const userEmail = user.email;
        const userResponse = await axios.get(
          `https://pf-ecommerce-henry.onrender.com/user/by-email?email=${userEmail}`
        );
        const userData = userResponse.data;
        const userId = userData.id;

<<<<<<< HEAD
        // Obtener el carrito del usuario usando su ID
        const linkGetCartProducts = `https://pf-ecommerce-henry.onrender.com/order/?id=${userId}`;
=======
        const linkGetCartProducts = `http://localhost:3002/order/?id=${userId}`;
>>>>>>> developer

        const cartResponse = await axios.get(linkGetCartProducts);
        const cartProducts = cartResponse.data;
        setCartProducts(cartProducts);

        const productRequests = cartProducts.map((cartProduct: CartProduct) =>
          axios.get(`https://pf-ecommerce-henry.onrender.com/products/${cartProduct.product_id}`)
        );

        const productResponses = await Promise.all(productRequests);
        const productsData = productResponses.map((response) => response.data);
        setProducts(productsData);
      } catch (error) {
        console.error("Error al traer los productos del carrito", error);
      }
    };

    fetchCartProducts();
  }, [user]);

  useEffect(() => {
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
      image: images[0],
      quantity: cartProduct.quantity,
    };
  };

  const handleDeleteProduct = async (productId: string) => {
    console.log(productId);
    try {
      const deleteProductResponse = await axios.delete(
        `https://pf-ecommerce-henry.onrender.com/order/delete/${productId}`
      );
      if (deleteProductResponse.status === 200) {
        const updatedCartProducts = cartProducts.filter(
          (product) => product.product_id !== productId
        );
        setCartProducts(updatedCartProducts);

        // Recargar la página después de eliminar un producto
        window.location.reload();
      }
    } catch (error) {
      console.error("Error al eliminar el producto del carrito", error);
    }
  };

  if (!user) {
    return <p className="text-lg">Loading...</p>;
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
                  <button
                    onClick={() =>
                      handleDeleteProduct(mappedProduct.id.toString())
                    }
                    className="text-sm text-red-600 hover:text-red-700 font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline mt-2"
                  >
                    Eliminar
                  </button>
                </div>
              );
            })}
            <div className="bg-gray-800 rounded-lg p-4 mt-8">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">Total a Pagar:</h2>
                <p className="text-xl font-semibold">${totalPrice}</p>
              </div>
              <ButtonPay cartProducts={cartProducts} totalPrice={totalPrice} />
            </div>
          </div>
        )}

        {products.length === 0 && (
          <div>
            <p>No hay productos en el Carrito</p>
            <Link href="/">
              <p className="text-lg text-indigo-500">Seguir comprando</p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
