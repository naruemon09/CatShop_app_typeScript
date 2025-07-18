import React from 'react'
import Navbar from './Navbar.tsx'
import { Outlet } from "react-router"
import Footer from './Footer.tsx'

const Layout: React.FC = () => {
  return (
    <div>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout