import Link from "next/link"
import SearchBar from '@/components/SearchBar'

export default function navBar() {
    return (
        <nav className="flex">
            <div className="flex">
                <Link href='/'>
                    Logo
                </Link>

                <SearchBar />

                <ul>
                    <li>
                        <Link href='/login'>
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

            <div>
                <ul>
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