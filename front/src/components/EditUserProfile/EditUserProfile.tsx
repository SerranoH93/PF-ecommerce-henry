import React from "react";
import Link from "next/link";

const EditUserProfile: React.FC = () => {
  return (
    <button>
      <Link href="/api/auth/logout">
        <p className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">
          Editar Usuario
        </p>
      </Link>
    </button>
  );
};

export default EditUserProfile;
