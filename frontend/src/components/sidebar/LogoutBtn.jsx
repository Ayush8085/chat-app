import React, { useState } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { useAuthContext } from '../../hooks/useAuth';
import {toast} from 'react-hot-toast';
import { BACKEND_URI } from '../../App';

const LogoutBtn = () => {
    const [isLoading, setIsloading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const handleLogout = async () => {
        setIsloading(true);
        try {
            const response = await fetch(`${BACKEND_URI}/api/v1/auth/logout`, {
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await response.json();
            if (data.error) {
                return toast.error(data.error);
            }
            localStorage.removeItem('auth-user');
            setAuthUser(null);
        } catch (error) {
            return toast.error(error);
        } finally {
            setIsloading(false);
        }
    }

    return (
        <div>
            <BiLogOut className='w-7 h-7 text-slate-500 cursor-pointer' onClick={handleLogout} />
        </div>
    )
}

export default LogoutBtn