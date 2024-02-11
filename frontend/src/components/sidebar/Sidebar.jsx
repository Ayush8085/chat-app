import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutBtn from './LogoutBtn'

const Sidebar = () => {
  return (
    <div className='flex flex-col justify-evenly'>
      <SearchInput />
      <hr />
      <Conversations />
      <LogoutBtn />
    </div>
  )
}

export default Sidebar