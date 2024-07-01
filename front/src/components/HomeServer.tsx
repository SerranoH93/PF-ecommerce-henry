import { getSession } from "@auth0/nextjs-auth0";
import HomeClient from "@/components/HomeClient";

export default async function HomeServer() {
    const session = await getSession();
    const user = session?.user;
    console.log(user)   

const response = await fetch('http://localhost:3002/products/');
    const initialProducts = await response.json();

    return (
        <HomeClient user={user} initialProducts={initialProducts} />
    );
}