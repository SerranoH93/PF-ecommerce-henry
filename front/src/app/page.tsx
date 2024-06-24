import Link from "next/link";
import Carousel from '@/components/Carousel/Carousel'
import Cards from "@/components/Cards/Cards";
import { getSession } from "@auth0/nextjs-auth0";

export default async function Home() {

  const session = await getSession();
  const user = session?.user;

  console.log(user)

  return (
    <div>
      <h1>Landing</h1>
    
      <Carousel />

      <Cards/>
    </div>
  );
}
