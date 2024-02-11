import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/MessageContainer'

const Home = () => {
  return (
    <div className=' min-h-[60vh] flex bg-white p-4 rounded-2xl'>
      <Sidebar />
      <hr className='' />
      {/* <MessageContainer /> */}
    </div>
  )
}

export default Home