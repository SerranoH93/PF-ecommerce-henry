import { useEffect, useState } from 'react';

interface Product {
    id: string;
    name: string;
    price: number;
    images: string[];
}

const useFetchProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async (nameFilter: string, categoryFilter: string, genderFilter: string) => {
        setLoading(true);
        setError(null);
        try {
            let url = 'https://pf-ecommerce-henry.onrender.com/products/';

            if (nameFilter || categoryFilter || genderFilter) {
                const queryParams = new URLSearchParams({
                    name: nameFilter,
                    category: categoryFilter,
                    gender: genderFilter,
                }).toString();

                url = `https://pf-ecommerce-henry.onrender.com/filter?${queryParams}`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error: any) {
            setError(error.message);
        }
        setLoading(false);
    };

    console.log(products);

    return { products, loading, error, fetchProducts };
};

export default useFetchProducts;