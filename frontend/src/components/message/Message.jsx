import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useAuthContext } from '../../hooks/useAuth';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser.user.id;
  const chatClassName = fromMe ? 'left' : 'right';

  return (
    <div className={` ${chatClassName === 'right'? 'flex justify-end' : ''}`}>
      <div className={`${chatClassName}`}>
        {message.message}
      </div>
    </div>
  )
}

export default Message