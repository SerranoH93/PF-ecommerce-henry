"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/Group 8.svg";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import { useEffect } from "react";

export default function NavBar() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      axios.post("http://localhost:3002/user/register", { user });
    }
  }, [user]);

  return (
    <nav className="className= mt-3">
      <div className="flex items-center justify-between flex-wrap bg-black px-6">
        <Link href="/">
          <div className="h-16 w-auto">
            <Image
              src={Logo}
              alt="logoModaUrbana"
              className="h-full w-auto object-contain"
            />
          </div>
        </Link>

        <ul className="flex gap-5">
          {!user && (
            <li>
              <Link href="/api/auth/login" className="text-white">
                Iniciar Sesión
              </Link>
            </li>
          )}

          {user && (
            <>
              <li>
                <Link href="/carrito" className="text-white">
                  Carrito
                </Link>
              </li>
              <li>
                <Link href="/usuario" className="text-white">
                  Usuario
                </Link>
              </li>
              <li>
                <Link href="/api/auth/logout" className="text-white">
                  Cerrar Sesion
                </Link>
              </li>
            </>
          )}

          <li>
            <Link href="/contacto">Contacto</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
