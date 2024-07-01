"use client"
import React, { FC } from 'react';
import { UserProfile } from "@auth0/nextjs-auth0/client"
import axios from "axios"
import { Product } from "../Detail/ProductDetail"

interface ButtonCartProps {
    product: Product;
    quantity: number;
    user?: UserProfile | undefined;
}

const AddToCart: FC<ButtonCartProps> = ({ product, quantity, user }) => {

    const userEmail = user?.email

    const handleAdd = async () => {
        const link = "http://localhost:3002/order/add"
        if (user) {

            
            try {
                const userDb = await axios.get(
                    `http://localhost:3002/user/by-email?email=${userEmail}`
                )
                
                const user = userDb.data;
                console.log(user)

                const orden = {
                    product,
                    quantity,
                    user
                }
                console.log('Enviando datos:', orden);

                const sendToCart = await axios.post(
                    link, {orden}, {
                        headers: {
                            'Content-Type': 'application/json'
                          }
                    }
                )
                //console.log(product)
                //console.log(quantity)
                //console.log(userId)
                //console.log(orden)
                console.log(sendToCart)
            }
            catch{
                console.error("no enviado")
            }
            
        }
    } 

    return (
        <div>
            <button onClick={handleAdd}>
                Agregar al Carrito
            </button>
        </div>
    )
}

export default AddToCart