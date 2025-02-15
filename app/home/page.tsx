import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import React from 'react'

const Home = () => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      {/* <div className="w-[80%] h-full"></div> */}
      <Topbar />
    </div>
  )
}

export default Home