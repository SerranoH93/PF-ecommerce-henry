"use client"

import React, {useEffect, useState} from 'react'
import styles from './Filters.module.css'

interface FiltersProps {
    nameFilter: string;
    setNameFilter: (value: string) => void;
    categoryFilter: string;
    setCategoryFilter: (value: string) => void;
    genderFilter: string;
    setGenderFilter: (value: string) => void;
    onSearch: () => void;
    onClick: () => void;
}

interface Category {
    id: number;
    name: string;
}

const Filters: React.FC<FiltersProps>  = ({ 
    nameFilter, 
    setNameFilter, 
    categoryFilter, 
    setCategoryFilter, 
    genderFilter, 
    setGenderFilter, 
    onSearch, 
    onClick 
}) => {

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://pf-ecommerce-henry.onrender.com/categories/');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="flex flex-col items-center gap-4 p-6">
            <div className=" w-full max-w-sm">                
                <input
                    id="search"
                    type='text'
                    placeholder='Buscar por nombre'
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded w-full text-black"
                />
            </div>
            <div className="flex gap-4">
                <div>
                    <label htmlFor="category" className="font-bold mb-2 block">Filtro por categoría: </label>
                    <select
                        id="category"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="p-2 border border-gray-300 rounded text-black w-full"
                    >
                        <option value="">Seleccionar categoría</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="gender" className="font-bold mb-2 block">Filtro por género: </label>
                    <select
                        id="gender"
                        value={genderFilter}
                        onChange={(e) => setGenderFilter(e.target.value)}
                        className="p-2 border border-gray-300 rounded text-black w-full"
                    >
                        <option value="">Seleccionar género</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>
                </div>
            </div>
            <div>
                <button
                    onClick={onSearch}
                    className="p-2 bg-[#FF9900] text-white rounded w-full max-w-sm"
                >
                    Buscar
                </button>
            </div>
            <div>
                <button
                    onClick={onClick}
                    className="text-white underline"
                >
                    Limpiar filtros
                </button>
            </div>
        </div>

    )
}

export default Filters;