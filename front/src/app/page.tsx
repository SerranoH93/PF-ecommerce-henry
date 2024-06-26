import Carousel from '@/components/Carousel/Carousel'
import Cards from "@/components/Cards/Cards";

export default async function Home() {

  return (
    <div>
      <Carousel />
      <div>
      <h1 className="flex justify-center p-5 text-lg font-bold">CONOZCA NUESTROS PRODUCTOS</h1>
      </div>
      <Cards/>
    </div>
  );
}
