import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { BACKEND_URI } from '../../App';
import { useAuthContext } from '../../hooks/useAuth';

const Signup = () => {
    const [isLoading, setIsloading] = useState(false);
    const [inputs, setInputs] = useState({
        fullName: '',
        username: '',
        gender: '',
        password: '',
        password2: '',
    })
    const { setAuthUser } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { fullName, username, gender, password, password2 } = inputs;

        if (!fullName || !username || !gender || !password || !password2) {
            return toast.error("All fields are required");
        }
        if (password !== password2) {
            return toast.error("Passwords do not match");
        }

        setIsloading(true);
        try {
            const response = await fetch(`${BACKEND_URI}/api/v1/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, username, gender, password, password2 })
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

            <h1 className="text-3xl font-bold">Sign Up</h1>
            <form onSubmit={handleSubmit} className=' flex flex-col gap-4 my-4'>
                <input
                    type="text"
                    name="fullName"
                    placeholder='Full name'
                    value={inputs.fullName}
                    onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                    className='p-4 bg-slate-100 rounded-2xl outline-none text-xl text-slate-600' />
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
                <input
                    type="password"
                    name="password2"
                    placeholder='Confirm Password'
                    value={inputs.password2}
                    onChange={(e) => setInputs({ ...inputs, password2: e.target.value })}
                    className='p-4 bg-slate-100 rounded-2xl outline-none text-xl text-slate-600' />

                <div className='flex'>
                    <label className='mx-1 text-slate-500'>Male</label>
                    <input type="radio" name="gender" value='male' onChange={(e) => setInputs({ ...inputs, gender: e.target.value })} />
                    <label className='mx-1 text-slate-500'>Female</label>
                    <input type="radio" name="gender" value='female' onChange={(e) => setInputs({ ...inputs, gender: e.target.value })} />
                </div>

                <button type="submit" className=' bg-slate-600 text-white p-4 rounded-2xl outline-none text-xl'>Sign Up</button>
            </form>
            <div>
                <span>Already have an account?</span>
                <Link to='/login'>
                    <span className='  text-slate-500'>
                        Login
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default Signup