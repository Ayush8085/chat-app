import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import useConversation from '../../zustand/useConversation';
import { BACKEND_URI } from '../../App';
import toast from 'react-hot-toast';

const MessageContainer = () => {
  const { messages, setMessages, selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    const getAllMessages = async () => {
      const res = await fetch(`${BACKEND_URI}/api/v1/messages/${selectedConversation.id}`, {
        credentials: 'include'
      });
      const data = await res.json();
      if (data.error) {
        return toast.error(data.error);
      }
      setMessages(data.messages);
    }
    getAllMessages();
  }, [selectedConversation?.id])

  useEffect(() => {

    return () => setSelectedConversation(null);
  }, [])

  return (
    <div className='flex flex-col justify-between my-6 sm:min-w-[30vw] min-w-fit'>
      {!selectedConversation ? (<NoChatSelected />) : (
        <>
          {/* HEADER */}
          <div className="flex justify-center bg-slate-500 text-2xl text-white p-2 rounded-2xl">
            {selectedConversation.fullName}
          </div>


          <Messages prop_messages={messages} />
          <MessageInput />

        </>
      )}
    </div>
  )
}

const NoChatSelected = () => {
  return (
    <div className='flex h-full flex-col justify-center m-auto'>
      <div className="">

        <p>Hello, Spidy.</p>
        <p>Start a conversation.</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 self-center">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        </svg>
      </div>
    </div>
  )
}


export default MessageContainer