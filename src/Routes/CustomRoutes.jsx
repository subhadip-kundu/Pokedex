import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Pokedex from '../Components/Pokedex/Pokedex'
import PokemonDetails from '../Components/PokemonDetails/PokemonDetails'
import Page404 from '../Page404/Page404'

function CustomRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Pokedex />} />
            <Route path='/404' element={<Page404 />} />
            <Route path='/pokemon/:id' element={<PokemonDetails />} />
        </Routes>
    )
}

export default CustomRoutes;