import React from 'react'

const MessageInput = () => {
    return (
        <div className='flex justify-center p-2 bg-slate-100 rounded-2xl outline-none  text-slate-600'>
            <input
                type="text"
                name="message"
                placeholder='Send message...'
                className='bg-slate-100 w-full outline-none' />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
        </div>
    )
}

export default MessageInput