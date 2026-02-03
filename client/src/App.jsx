import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import VideoPlayer from './components/VideoPlayer';
import Options from './components/Options';
import Notifications from './components/Notifications';
import Login from './pages/Login';
import Register from './pages/Register';

const Home = () => {
    const token = localStorage.getItem('token');
    if (!token) return <Navigate to="/login" />;

    return (
        <div className="wrapper flex flex-col items-center w-full min-h-screen pt-10 px-5 relative overflow-hidden">
            {/* Background blobs */}
            <div className="fixed top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-blob"></div>
            <div className="fixed top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-blob animation-delay-2000"></div>
            <div className="fixed -bottom-32 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-blob animation-delay-4000"></div>

            <header className="flex flex-col items-center mb-10 z-10">
                <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 tracking-tight">
                    AuraMeet
                </h2>
                <button 
                  onClick={() => { localStorage.removeItem('token'); window.location.reload(); }}
                  className="absolute top-5 right-5 text-sm text-gray-400 hover:text-white"
                >
                  Logout
                </button>
                <p className="text-gray-400 mt-2 text-lg">Connect instantly, anywhere.</p>
            </header>

            <div className="w-full max-w-[1200px] z-10">
                <VideoPlayer />
                <Options>
                    <Notifications />
                </Options>
            </div>
        </div>
    );
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
