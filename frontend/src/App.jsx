import Login from "./pages/login/Login"
import Signup from "./pages/signup/Signup"
import Home from "./pages/home/Home"
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="min-h-screen max-w-screen flex flex-col justify-center items-center bg-slate-300">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
