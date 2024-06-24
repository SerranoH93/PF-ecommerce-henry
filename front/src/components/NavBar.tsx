import Link from "next/link"
import SearchBar from '@/components/SearchBar'

export default function navBar() {
    return (
        <nav className="">
            <div className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
                <Link href='/'>
                    Logo
                </Link>

                <SearchBar />

                <ul className="flex gap-5">
                    <li>
                        <Link href='/crear'>
                            Crear
                        </Link>
                    </li>
                    <li>
                        <Link href='/api/auth/login'>
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link href='/carrito'>
                            Carrito
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="flex">
                <ul className="flex gap-8">
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