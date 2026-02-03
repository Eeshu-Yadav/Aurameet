import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Registration failed');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white">
            <div className="p-8 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Join AuraMeet</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Username" 
                        onChange={handleChange} 
                        className="p-3 rounded bg-black/30 border border-white/10 focus:outline-none focus:border-purple-500"
                    />
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        onChange={handleChange} 
                        className="p-3 rounded bg-black/30 border border-white/10 focus:outline-none focus:border-purple-500"
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        onChange={handleChange} 
                        className="p-3 rounded bg-black/30 border border-white/10 focus:outline-none focus:border-purple-500"
                    />
                    <button type="submit" className="bg-purple-600 hover:bg-purple-700 py-3 rounded font-bold transition-colors">Register</button>
                    <p className="text-center text-gray-400 mt-2">
                        Already have an account? <Link to="/login" className="text-purple-400 hover:underline">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
