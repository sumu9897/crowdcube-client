import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function MainLayout() {
    return (
        <div>
            <Navbar/>
            <div>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}

export default MainLayout
