import React from 'react'
import Message from './Message'

const Messages = () => {
    return (
        <div className='flex flex-col justify-start  h-[40vh] gap-4 overflow-scroll scroll-smooth'>
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
        </div>
    )
}

export default Messages