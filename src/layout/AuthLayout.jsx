import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function AuthLayout() {
    return (
        <div>
            <header>
                <Navbar/>
            </header>
            <main className=''>
                <Outlet/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    )
}

export default AuthLayout