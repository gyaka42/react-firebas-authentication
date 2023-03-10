import React, { useState } from "react";
import { register } from "../firebase";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png"


export default function Register() {
    const navigate=useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = await register(email, password)
        setEmail("")
        setPassword("")
        navigate("/")
        
        
    }
    return (
        <form className="max-w-xl mx-auto grid gap-y-4 py-4" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center">
                <div>
                    <img src={logo} className="mt-40 rounded-full w-54"/>
                </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <div className="mt-1">
                    <input type="email" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Parola
                </label>
                <div className="mt-1">
                    <input type="password" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="*******" value={password} onChange={e => setPassword(e.target.value)} />                </div>
            </div>
            </div>

            
            
            <div className="flex justify-center gap-10 mt-10">
            <div>
            <button disabled={!email || !password} className="disabled:opacity-20 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit"> Create </button>
            </div>
            <div>
            <button className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{navigate("/")}} > Back </button>
            </div>
            </div>
        </form>
    )
}