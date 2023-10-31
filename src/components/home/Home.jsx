import './home.css'
import { Banner } from '../banner/Banner';
import { Routes, Route } from 'react-router';
import {Profile} from '../profile/Profile';
import {Inventory} from '../inventory/Inventory'

export const Home = () => {    
    
    return (
        <div className='homeContent'>
        <Banner></Banner>
        <h1 className='textHome'>Bienvenido</h1>
        <Routes>
            <Route path='/profile' element={<Profile/> }/>
            <Route path='/inventory' element={<Inventory/> }/>
        </Routes>
        </div>
    )
}
