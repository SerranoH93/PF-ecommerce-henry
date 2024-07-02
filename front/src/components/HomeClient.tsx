"use client"

import React, { useState, useEffect } from 'react';
import Cards from '@/components/Cards/Cards';
import Filters from '@/components/Filters/Filtes';
import useFetchProducts from '@/Hooks/useFetchProducts';
import Carousel from './Carousel/Carousel';

interface Product {
    id: string;
    name: string;
    price: number;
    images: string[];
}

interface HomeClientProps {
    user: any;
    initialProducts: Product[];
}

const HomeClient: React.FC<HomeClientProps> = ({ user, initialProducts }) => {
    const [nameFilter, setNameFilter] = useState<string>('');
    const [categoryFilter, setCategoryFilter] = useState<string>('');
    const [genderFilter, setGenderFilter] = useState<string>('');

    const { products, loading, error, fetchProducts } = useFetchProducts();

    const handleSearch = () => {
        fetchProducts(nameFilter, categoryFilter, genderFilter);
    };

    const handleReset = () => {
        setNameFilter('');
        setCategoryFilter('');
        setGenderFilter('');
        fetchProducts('', '', '');
    };

    useEffect(() => {
        fetchProducts('', '', '');
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <Carousel/>
            <Filters
                nameFilter={nameFilter}
                setNameFilter={setNameFilter}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                genderFilter={genderFilter}
                setGenderFilter={setGenderFilter}
                onSearch={handleSearch}
                onClick={handleReset}
            />
            
            <h1 className="flex justify-center p-5 text-lg font-bold">CONOZCA NUESTROS PRODUCTOS</h1>
            <div className='mx-20'>
                <Cards products={products} />
            </div>
            
        </div>
    );
};

export default HomeClient;