import React from 'react'
import SidebarAdmin from './SidebarAdmin'
import { Outlet } from 'react-router-dom'

const LayoutAdmin = () => {
  return (
    <div className="d-flex" style={{background: '#f2f3f4'}}>
        <SidebarAdmin/>
        <Outlet/>  
    </div>
  )
}

export default LayoutAdmin