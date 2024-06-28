import { ProductProvider } from '@/context/productContex';
import Carousel from '@/components/Carousel/Carousel'
import Cards from "@/components/Cards/Cards";
import { getSession } from "@auth0/nextjs-auth0";
import Dashboard from '@/components/Dashboard/Dashboard';



export default async function Home() {

  const session = await getSession();
  const user = session?.user;

  console.log(user)

  return (
    <ProductProvider>
      <div>
        <Carousel />
        <div>
        <h1 className="flex justify-center p-5 text-lg font-bold">CONOZCA NUESTROS PRODUCTOS</h1>
        </div>
     
        <Dashboard/>
        <Cards/>
       
      </div>
    </ProductProvider>
  );
}
