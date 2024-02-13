import React, { useEffect, useState } from 'react'
import Conversation from './Conversation'
import { toast } from 'react-hot-toast'
import { BACKEND_URI } from '../../App';

const Conversations = () => {
    const [isLoading, setIsloading] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getConversationUser = async () => {
            setIsloading(true);
            try {
                const response = await fetch(`${BACKEND_URI}/api/v1/users`, {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                })

                const data = await response.json();
                console.log('DATA: ', data);
                if (data.error) {
                    return toast.error(data.error);
                }

                setUsers(data);

            } catch (error) {
                return toast.error(error);
            } finally {
                setIsloading(false);
            }
        }
        getConversationUser();
    }, [])

    return (
        <div className='overflow-scroll h-[60%]'>
            {
                !isLoading ?
                    (users.map((user) => {
                        return <Conversation key={user.id} conversation={user} />
                    })) : null
            }
        </div>
    )
}

export default Conversations