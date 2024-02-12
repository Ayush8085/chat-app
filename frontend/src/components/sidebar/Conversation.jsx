import React from 'react'
import useConversation from '../../zustand/useConversation';

const Conversation = ({ conversation }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    const isSeletect = selectedConversation?.id === conversation.id;

    return (
        <>
            <div
                onClick={() => setSelectedConversation(conversation)}
                className={`flex justify-between p-2 rounded-xl hover:bg-slate-400 hover:text-white cursor-pointer ${isSeletect ? 'bg-slate-500' : ''}`}>
                <div className="">
                    {/* AVATAR */}
                    <img src={conversation.avatar} alt="" className='w-10 h-10' />
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