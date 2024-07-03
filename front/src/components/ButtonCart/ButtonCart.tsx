import React from "react";

const Button = ({ type = "button", disabled = false, className = "" }) => {
  return (
    <button className="flex justify-center items-center gap-1 px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md border-2 border-purple-600 shadow-md focus:outline-none focus:border-purple-800">
      <svg
        className="w-4 h-4 stroke-current"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          strokeLinejoin="round"
          strokeLinecap="round"
        ></path>
      </svg>

      <span>Ver más</span>
    </button>
  );
};

export default Button;
