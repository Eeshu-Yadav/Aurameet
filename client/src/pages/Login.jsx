import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
            const res = await axios.post(`${BACKEND_URL}/api/auth/login`, formData);
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Login failed');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white">
            <div className="p-8 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Login to AuraMeet</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        onChange={handleChange} 
                        className="p-3 rounded bg-black/30 border border-white/10 focus:outline-none focus:border-blue-500"
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        onChange={handleChange} 
                        className="p-3 rounded bg-black/30 border border-white/10 focus:outline-none focus:border-blue-500"
                    />
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 py-3 rounded font-bold transition-colors">Login</button>
                    <p className="text-center text-gray-400 mt-2">
                        Don't have an account? <Link to="/register" className="text-blue-400 hover:underline">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
