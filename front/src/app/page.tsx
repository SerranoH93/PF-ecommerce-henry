import Link from "next/link";
import Carousel from '@/components/Carousel/Carousel'
import Cards from "@/components/Cards/Cards";

export default function Home() {
  return (
    <div>
      <h1>Landing</h1>
    
      <Carousel />

      <Cards/>
    </div>
  );
}
