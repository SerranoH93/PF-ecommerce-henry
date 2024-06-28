import React from 'react';
import Carousel from '@/components/Carousel/Carousel';
import Cards from "@/components/Cards/Cards";
import Dashboard from '@/components/Dashboard/Dashboard';

const Home: React.FC = () => {
  return (
    <div>
      <Carousel />
      <div>
        <h1 className="flex justify-center p-5 text-lg font-bold">CONOZCA NUESTROS PRODUCTOS</h1>
      </div>
      <Dashboard />
      <Cards />
    </div>
  );
};

export default Home;
