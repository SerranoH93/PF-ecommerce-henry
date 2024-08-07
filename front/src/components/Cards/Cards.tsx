import React, { useState } from "react";
import Card from "@/components/Card/Card";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
}

interface CardsProps {
  products: Product[];
}

const Cards: React.FC<CardsProps> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 15;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div>
      <div className="flex flex-wrap justify-around">
        {selectedProducts.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.images[0]}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded-md ${
              index + 1 === currentPage
                ? "bg-purple-600 text-white font-medium"
                : "bg-gray-200 text-gray-800"
            } hover:bg-purple-700 hover:text-white focus:outline-none focus:bg-purple-700 focus:text-white`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Cards;
