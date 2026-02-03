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
        <div className="wrapper flex flex-col items-center w-full min-h-screen pt-10 px-5 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Enhanced background blobs */}
            <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 animate-blob"></div>
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 animate-blob animation-delay-2000"></div>
            <div className="fixed -bottom-32 left-20 w-[500px] h-[500px] bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 animate-blob animation-delay-4000"></div>

            <header className="flex flex-col items-center mb-10 z-10">
                <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 tracking-tight mb-2">
                    AuraMeet
                </h2>
                <button 
                  onClick={() => { localStorage.removeItem('token'); window.location.reload(); }}
                  className="absolute top-5 right-5 px-4 py-2 text-sm bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white rounded-lg backdrop-blur-sm border border-white/20 transition-all"
                >
                  Logout
                </button>
                <p className="text-gray-300 mt-2 text-lg font-light">Connect instantly, anywhere.</p>
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
