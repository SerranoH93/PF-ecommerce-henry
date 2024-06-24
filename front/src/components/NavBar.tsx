"use client"
import Link from "next/link"
import Image from "next/image"
import SearchBar from '@/components/SearchBar'
import Logo from "@/assets/Group 8.svg"
import { useUser } from "@auth0/nextjs-auth0/client"
import axios from "axios"

export default function NavBar() {
    const {user} = useUser()

    console.log(user)

    if (user){
        axios.post("http://localhost:3002/user/register" , {user})
    }
    
    return (
        <nav className="">
            <div className="flex items-center justify-between flex-wrap bg-black px-6"> {/* Cambié p-6 a px-6 */}
                <Link href='/'>
                    <div className="h-16 w-auto"> {/* Contenedor del logo */}
                        <Image src={Logo} alt="logoModaUrbana" className="h-full w-auto object-contain" />
                    </div>
                </Link>

                <SearchBar />

                <ul className="flex gap-5 " >
                    <li>
                        <Link href='/product' className="text-white">
                            Crear
                        </Link>
                    </li>
                    <li>
                        <Link href='/api/auth/login' className="text-white">
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link href='/api/auth/logout' className="text-white">
                            Logout
                        </Link>
                    </li>
                    <li>
                        <Link href='/carrito' className="text-white">
                            Carrito
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="flex w-full p-4" >
                <ul className="flex gap-8 justify-around w-full ">
                    <li>
                        <Link href="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/destacados">
                            Destacados
                        </Link>
                    </li>
                    <li>
                        <Link href="/hombre">
                            Hombre
                        </Link>
                    </li>
                    <li>
                        <Link href="/mujer">
                            Mujer
                        </Link>
                    </li>
                    <li>
                        <Link href="/ninho">
                            Niño/a
                        </Link>
                    </li>
                    <li>
                        <Link href="/accesorios">
                            Accesorios
                        </Link>
                    </li>
                    <li>
                        <Link href="/contacto">
                            Contacto
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
