import React, { useEffect, useRef } from 'react'
import Message from './Message'
import { useScoketContext } from '../../hooks/useSocket';
import useConversation from '../../zustand/useConversation';

const Messages = ({ prop_messages }) => {
    const lastMessageRef = useRef();

    const { socket } = useScoketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            setMessages([...messages, newMessage]);
        })

        return () => socket.off('newMessage');
    }, [socket, messages, setMessages])

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({});
        }, 100)
    }, [messages])

    return (
        <div className='flex flex-col justify-start  h-[40vh] gap-4 overflow-scroll scroll-smooth'>

            {
                prop_messages.map((message) => {
                    return <div key={message.id} ref={lastMessageRef}>
                        <Message message={message} />
                    </div>
                })
            }
        </div>
    )
}

export default Messages