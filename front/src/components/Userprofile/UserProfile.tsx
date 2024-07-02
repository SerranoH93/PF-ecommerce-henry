"use client";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

export default function UserProfile() {
  const { user } = useUser();

  if (user) {
    fetch("http://localhost:3002/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No es buena la respuesta del back");
        }
        return response.json();
      })
      .then((responseData) => {
        console.log("Success:", responseData);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });

    return (
      <div>
        {user.picture && (
          <Image
            src={user.picture}
            width={200}
            height={200}
            alt="Foto de perfil"
          />
        )}
        <h2>{user.name}</h2>
        <h3>{user.email}</h3>
        <Link href="/api/auth/logout">Cerrar Sesión</Link>
      </div>
    );
  }

  return null;
}
