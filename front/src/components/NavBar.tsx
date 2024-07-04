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

  const userAdmin = user?.email;

  return (
    <nav className="mt-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between bg-black px-6 py-4">
        <Link href="/">
          <div className="h-16 w-auto cursor-pointer mb-4 md:mb-0">
            <Image
              src={Logo}
              alt="logoModaUrbana"
              className="h-full w-auto object-contain mx-auto"
            />
          </div>
        </Link>

        <ul className="flex gap-5 w-full md:w-auto justify-center md:justify-end">
          {userAdmin === "modaurbana45@gmail.com" && (
            <li>
              <Link
                href="/dashboard"
                className="text-white hover:text-gray-400"
              >
                Panel de control
              </Link>
            </li>
          )}
          {!user && (
            <li>
              <Link
                href="/api/auth/login"
                className="text-white hover:text-gray-400"
              >
                Iniciar Sesión
              </Link>
            </li>
          )}

          {user && (
            <>
              <li>
                <Link
                  href="/carrito"
                  className="text-white hover:text-gray-400"
                >
                  Carrito
                </Link>
              </li>
              <li>
                <Link
                  href="/usuario"
                  className="text-white hover:text-gray-400"
                >
                  Usuario
                </Link>
              </li>
              <li>
                <Link
                  href="/api/auth/logout"
                  className="text-white hover:text-gray-400"
                >
                  Cerrar Sesión
                </Link>
              </li>
            </>
          )}

          <li>
            <Link href="/contacto" className="text-white hover:text-gray-400">
              Contacto
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
