"use client";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import EditUserProfile from "../EditUserProfile/EditUserProfile";
import axios from "axios";
import { useEffect, useState } from "react";

interface UserData {
  name: string;
  email: string;
  picture?: string;
}

export default function UserProfile() {
  const { user } = useUser();
  const userEmail = user?.email;
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (userEmail) {
      axios
        .get(
          `http://localhost:3002/user/by-email?email=${encodeURIComponent(
            userEmail
          )}`
        )
        .then((response) => {
          console.log("Datos de usuario obtenidos:", response.data);
          setUserData(response.data);
        })
        .catch((error) => {
          console.error(
            "Hubo un problema con la operación de obtener usuario:",
            error
          );
        });
    }
  }, [userEmail]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
        {userData && userData.picture && (
          <Image
            src={userData.picture}
            width={200}
            height={200}
            alt="Foto de perfil"
            className="rounded-full mx-auto"
          />
        )}
        <h2 className="text-2xl font-semibold mt-4 text-center">
          {userData ? userData.name : user.name}
        </h2>
        <h3 className="text-lg text-center mt-2">
          {userData ? userData.email : user.email}
        </h3>
        <div className="text-center mt-4">
          <Link href="/api/auth/logout">
            <p className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Cerrar Sesión
            </p>
          </Link>
          <div className="font-bold py-2 px-4 rounded">
            <EditUserProfile />
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}
