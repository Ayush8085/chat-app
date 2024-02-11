import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/message/MessageContainer'

const Home = () => {
  return (
    <div className=' min-h-[60vh] flex gap-4 bg-white p-4 rounded-2xl'>
      <Sidebar />
      <div className=" border-r-2 my-6"></div>
      <MessageContainer />
    </div>
  )
}

export default Home