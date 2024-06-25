"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import Image from 'next/image'

export default function Usuario() {
    const { user, error, isLoading } = useUser()

    if (user) {

        const [ data, setData ] = useState({})

        useEffect(() => {
            const asignData = async () => {
                setData(user)
            }
            asignData()
        },[])

        useEffect(() => {
            const sendData = async () => {
                if (data) {
                    const email = user.email;
                    const email_verified = user.email_verified;
                    const name = user.name;
                    const nickname = user.nickname;
                    const picture = user.picture;

                    const dataToSend = { email, email_verified, name, nickname, picture }

                    console.log(dataToSend)

                    const response = await fetch('http://localhost:3002/user/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataToSend),
                    })

                    const result = await response.json()
                    console.log(result.message)
                }
            }
            sendData()
        },[data])
        

        return (
            <div>
                <Image
                    src={user.picture}
                    width={200}
                    height={200}
                    alt="Foto de perfil"
                />
                <h2>{user.name}</h2>
                <h3>{user.email}</h3>
                <Link href='/api/auth/logout'>
                        Logout
                </Link>
            </div>
        )
    }

    return (
        <div>
            <h1>Usuario</h1>
            <Link href='/api/auth/login'>
                    Login
            </Link>
        </div>
    )
}