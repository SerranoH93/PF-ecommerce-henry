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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("phone", data.phoneNumber);
    if (data.profilePicture[0]) {
      formData.append("picture", data.profilePicture[0]);
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
        alert("User updated successfully!");
      } else {
        alert("Failed to update user.");
      }
    } catch (error) {
      console.error("There was an error updating the user!", error);
      alert("An error occurred while updating the user.");
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <button
              className="text-gray-500 hover:text-gray-700 float-right"
              onClick={() => setModalIsOpen(false)}
            >
              &times;
            </button>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-500 text-xs italic">
                    This field is required
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Address:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("address", { required: true })}
                />
                {errors.address && (
                  <span className="text-red-500 text-xs italic">
                    This field is required
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone Number:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("phoneNumber", { required: true })}
                />
                {errors.phoneNumber && (
                  <span className="text-red-500 text-xs italic">
                    This field is required
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Profile Picture:
                </label>
                <input
                  type="file"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("profilePicture")}
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit
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
