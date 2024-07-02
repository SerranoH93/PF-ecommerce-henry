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
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-10 ">
          {user.picture && (
            <Image
              src={user.picture}
              width={200}
              height={200}
              alt="Foto de perfil"
              className="rounded-full mx-auto"
            />
          )}
          <h2 className="text-2xl font-semibold mt-4 text-center">
            {user.name}
          </h2>
          <h3 className="text-lg text-center mt-2">{user.email}</h3>
          <div className="text-center mt-4">
            <Link href="/api/auth/logout">
              <p className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Cerrar Sesión
              </p>
            </Link>
          </div>
        </div>
        <br />
      </div>
    );
  }

  return null;
}
