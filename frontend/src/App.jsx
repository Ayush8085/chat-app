import Login from "./pages/login/Login"
import Signup from "./pages/signup/Signup"
import Home from "./pages/home/Home"
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from "./hooks/useAuth";

export const BACKEND_URI = import.meta.env.VITE_APP_BACKEND_URL;

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className="min-h-screen max-w-screen flex flex-col justify-center items-center bg-slate-300">
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to='/login' />} />
        <Route path="/login" element={authUser ? <Navigate to='/' /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to='/' /> : <Signup />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
