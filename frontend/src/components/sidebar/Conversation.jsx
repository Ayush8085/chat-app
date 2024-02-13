import React from 'react'
import useConversation from '../../zustand/useConversation';
import { useScoketContext } from '../../hooks/useSocket';
import { GoDotFill } from "react-icons/go";

const Conversation = ({ conversation }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { onlineUsers } = useScoketContext();

    const isSeletect = selectedConversation?.id === conversation.id;
    const isOnline = onlineUsers.includes(conversation.id)

    return (
        <>
            <div
                onClick={() => setSelectedConversation(conversation)}
                className={`flex justify-between p-2 rounded-xl hover:bg-slate-400 hover:text-white cursor-pointer ${isSeletect ? 'bg-slate-500' : ''}`}>
                <div className={`${isOnline ? 'relative' : ''}`}>
                    {/* AVATAR */}
                    <img src={conversation.avatar} alt="" className='w-10 h-10' />
                    <GoDotFill className={`${isOnline ? 'absolute top-0 right-0 text-green-500' : 'hidden'}`} />
                </div>
                <div className="">
                    {/* NAME */}
                    {conversation.fullName}
                </div>
            </div>
            <hr />
        </>
    )
}

export default Conversation