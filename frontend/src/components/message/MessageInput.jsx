import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { BACKEND_URI } from '../../App';
import useConversation from '../../zustand/useConversation';

const MessageInput = () => {
    const [message, setMessage] = useState('');
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!message) {
            return toast.error('Message cannot be empty!!');
        }

        try {
            const res = await fetch(`${BACKEND_URI}/api/v1/messages/send/${selectedConversation.id}`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });

            const data = await res.json();
            console.log('DATA: ', data);
            if (data.error) {
                return toast.error(data.error);
            }
            setMessages([...messages, data.newMessage])
            setMessage('');
        } catch (error) {
            return toast.error(error);
        }
    }

    return (
        <form onSubmit={sendMessage} className='flex justify-center p-2 bg-slate-100 rounded-2xl outline-none  text-slate-600'>
            <input
                type="text"
                name="message"
                placeholder='Send message...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className='bg-slate-100 w-full outline-none' />
            <button type='submit'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
            </button>
        </form>
    )
}

export default MessageInput