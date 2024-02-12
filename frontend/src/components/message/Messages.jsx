import React, { useEffect, useRef } from 'react'
import Message from './Message'

const Messages = ({ messages }) => {

    const lastMessageRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behaviour: 'smooth' });
        }, 100)
    }, [messages])

    return (
        <div className='flex flex-col justify-start  h-[40vh] gap-4 overflow-scroll scroll-smooth'>

            {
                messages.map((message) => {
                    return <div key={message.id} ref={lastMessageRef}>
                        <Message message={message} />
                    </div>
                })
            }
        </div>
    )
}

export default Messages