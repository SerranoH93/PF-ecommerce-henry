"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import SearchBar from '@/components/SearchBar';
import Logo from "@/assets/Group 8.svg";

interface filter {
  id: string;
  name: string;
}

export default function NavBar() {
  const [filters, setfilters] = useState<filter[]>([]);

  useEffect(() => {
    const fetchfilters = async () => {
      try {
        const response = await fetch('/api/filters'); // URL correcta para la API
        if (response.ok) {
          const data = await response.json();
          setfilters(data);
        } else {
          console.error('Error al obtener filters:', response.statusText);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchfilters();
  }, []);

  return (
    <nav className="">
      <div className="flex items-center justify-between flex-wrap bg-black px-6">
        <Link href='/'>
          <div className="h-16 w-auto">
            <Image
              src={Logo}
              alt="logoModaUrbana"
              className="h-full w-auto object-contain"
              priority
            />
          </div>
        </Link>

        <SearchBar />

        <ul className="flex gap-5">
          <li>
            <Link href='/product' className="text-white">
              Crear
            </Link>
          </li>
          <li>
            <Link href='/login' className="text-white">
              Login
            </Link>
          </li>
          <li>
            <Link href='/carrito' className="text-white">
              Carrito
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex w-full p-4">
        <ul className="flex gap-8 justify-around w-full">
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
            <Link href="/hombre"> {/* Actualiza esta ruta */}
              Hombre
            </Link>
          </li>
          <li>
            <Link href="/gender/mujer"> {/* Actualiza esta ruta */}
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
          {filters.map((filter) => (
            <li key={filter.id}>
              <Link href={`/filter/${filter.id}`}>
                {filter.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
