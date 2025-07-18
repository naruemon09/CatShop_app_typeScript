import React from 'react'
import NavbarAdmin from './NavbarAdmin'
import SidebarAdmin from './SidebarAdmin'
import { Outlet } from 'react-router-dom'

const LayoutAdmin = () => {
  return (
    <div className="d-flex" style={{background: '#f2f3f4'}}>
        <SidebarAdmin/>
        <NavbarAdmin/>
        <Outlet/>
    </div>
  )
}

export default LayoutAdmin