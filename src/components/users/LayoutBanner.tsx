import React from 'react'
import Banner from './Banner'
import { Outlet } from 'react-router-dom'

const LayoutBanner: React.FC = () => {
  return (
    <div>
        <Banner/>
        <Outlet/>
    </div>
  )
}

export default LayoutBanner