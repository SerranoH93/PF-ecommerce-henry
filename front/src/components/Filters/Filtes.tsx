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
                const response = await fetch('http://localhost:3002/categories/');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div>
            <label htmlFor="">Buscar: </label>
            <input 
                type='text'
                placeholder='Buscar por nombre'
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className='text-black'
            />

            <label htmlFor="">Filtro por categoría: </label>
            <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className='text-black'
            >
                <option className='text-black' value="">Seleccionar categoría</option>
                {categories.map((category) => (
                    <option key={category.id} className='text-black' value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            <label htmlFor="">Filtro por género: </label>
            <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className='text-black'
            >
                <option className='text-black' value="">Seleccionar género</option>
                <option  className='text-black' value="Masculino">Masculino</option>
                <option className='text-black' value="Femenino">Femenino</option>
            </select>

            <button onClick={onSearch}>Buscar</button>
            <button onClick={onClick}>Reiniciar filtros</button>
        </div>
    )
}

export default Filters;