import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useAuthContext } from '../../hooks/useAuth';
import { BACKEND_URI } from '../../App';


const Login = () => {
    const [isLoading, setIsloading] = useState(false);
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    })
    const { setAuthUser } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password } = inputs;

        if (!username || !password) {
            return toast.error("All fields are required");
        }

        setIsloading(true);
        try {
            const response = await fetch(`${BACKEND_URI}/api/v1/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })
            
            const data = await response.json();
            if (data.error) {
                return toast.error(data.error);
            }

            localStorage.setItem('auth-user', JSON.stringify(data));
            setAuthUser(data);
        } catch (error) {
            return toast.error(error);
        } finally {
            setIsloading(false);
        }
    }

    return (
        <div className='min-h-fit max-w-fit bg-white flex flex-col text-center p-8 rounded-2xl'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 self-center">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>

            <h1 className="text-3xl font-bold">Login</h1>
            <form className=' flex flex-col gap-4 my-4' onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder='Username'
                    value={inputs.username}
                    onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                    className='p-4 bg-slate-100 rounded-2xl outline-none text-xl text-slate-600' />
                <input
                    type="password"
                    name="password"
                    placeholder='Password'
                    value={inputs.password}
                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                    className='p-4 bg-slate-100 rounded-2xl outline-none text-xl text-slate-600' />
                <button type="submit" className=' bg-slate-600 text-white p-4 rounded-2xl outline-none text-xl'>Login</button>
            </form>
            <div>
                <span>Don't have an account?</span>
                <Link to='/signup'>
                    <span className='  text-slate-500'>
                        Register
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default Login