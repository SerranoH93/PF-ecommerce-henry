"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

interface EditUserProfileProps {
  userEmail?: string | null;
}

interface FormValues {
  name: string;
  address: string;
  phoneNumber: string;
  profilePicture: FileList;
}

const EditUserProfile: React.FC<EditUserProfileProps> = ({ userEmail }) => {
  const { register, handleSubmit } = useForm<FormValues>();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();

    // Solo agregamos los campos que están presentes
    if (data.name) {
      formData.append("name", data.name);
    }
    if (data.address) {
      formData.append("address", data.address);
    }
    if (data.phoneNumber) {
      formData.append("phone", data.phoneNumber);
    }
    if (data.profilePicture && data.profilePicture[0]) {
      formData.append("images", data.profilePicture[0]);
    }

    try {
      const response = await axios.put(
        `http://localhost:3002/user/edit?email=${userEmail}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        window.location.reload(); // Recarga la página
      } else {
        console.error("Failed to update user.");
      }
    } catch (error) {
      console.error("There was an error updating the user!", error);
    }

    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>
        <p className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">
          Editar Usuario
        </p>
      </button>

      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md text-white">
            <button
              className="text-gray-400 hover:text-gray-200 float-right text-2xl"
              onClick={() => setModalIsOpen(false)}
            >
              &times;
            </button>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2">
                  Name:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
                  {...register("name")}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2">
                  Address:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
                  {...register("address")}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2">
                  Phone Number:
                </label>
                <input
                  type="number"
                  className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
                  {...register("phoneNumber")}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2">
                  Profile Picture:
                </label>
                <input
                  type="file"
                  className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
                  {...register("profilePicture")}
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Actualizar Perfil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUserProfile;
