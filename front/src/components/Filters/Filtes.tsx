"use client"

import React from 'react'
import styles from './Filters.module.css'

interface FiltersProps {
    nameFilter: string;
    setNameFilter: (value: string) => void;
    categoryFilter: string;
    setCategoryFilter: (value: string) => void;
    genderFilter: string;
    setGenderFilter: (value: string) => void;
    onSearch: () => void;
}


const Filters: React.FC<FiltersProps>  = ({ nameFilter, setNameFilter, categoryFilter, setCategoryFilter, genderFilter, setGenderFilter, onSearch }) => {
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
                <option className='text-black' value="1">Pantalones</option>
                <option className='text-black' value="2">Rameras</option>
                <option className='text-black' value="3">Chaquetas</option>
                <option className='text-black' value="4">Buzos</option>
                <option className='text-black' value="5">Faldas</option>
                <option className='text-black' value="6">Camisas</option>
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
        </div>
    )
}

export default Filters;