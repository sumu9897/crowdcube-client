import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function MainLayout() {
    return (
        <div>
            <Navbar/>
            <div className='max-w-screen-2xl mx-auto px-4 mt-20'>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}

export default MainLayout
