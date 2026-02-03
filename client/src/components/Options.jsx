import React, { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Copy, Phone, PhoneOff, Mic, MicOff, Video, VideoOff } from 'lucide-react';

const Options = ({ children }) => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser, toggleAudio, audioEnabled, toggleVideo, videoEnabled } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');

    return (
        <div className="flex justify-center my-6 px-4">
            <div className="p-6 rounded-2xl bg-slate-800/80 backdrop-blur-xl border border-purple-500/20 w-full max-w-2xl shadow-2xl">
                <form className="flex flex-col" noValidate autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col md:flex-row gap-6 justify-between">
                        {/* Account Info */}
                        <div className="flex-1 flex flex-col gap-4">
                            <h6 className="text-purple-300 text-xs font-bold uppercase tracking-widest">Account Info</h6>
                            <input 
                                className="w-full p-3 rounded-xl border border-purple-500/30 bg-slate-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
                                placeholder="Your Name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            />
                            <div className="flex items-center gap-2 bg-gradient-to-r from-slate-900/80 to-slate-800/80 p-3 rounded-xl border border-purple-500/20">
                                <span className="text-xs text-purple-300 font-mono flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                                    ID: {me}
                                </span>
                                <button 
                                    type="button"
                                    className="text-purple-400 hover:text-purple-300 transition-colors p-1.5 hover:bg-purple-500/10 rounded-lg" 
                                    onClick={() => navigator.clipboard.writeText(me)}
                                    title="Copy ID"
                                >
                                    <Copy size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Make a Call */}
                        <div className="flex-1 flex flex-col gap-4">
                            <h6 className="text-blue-300 text-xs font-bold uppercase tracking-widest">Make a Call</h6>
                            <input 
                                className="w-full p-3 rounded-xl border border-blue-500/30 bg-slate-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                                placeholder="Enter ID to Call" 
                                value={idToCall} 
                                onChange={(e) => setIdToCall(e.target.value)} 
                            />
                            {callAccepted && !callEnded ? (
                                <div className="flex gap-2">
                                    <button 
                                        onClick={leaveCall} 
                                        className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl font-semibold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
                                    >
                                        <PhoneOff size={18} /> End
                                    </button>
                                    <button 
                                        onClick={toggleAudio} 
                                        className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl font-semibold text-white transition-all shadow-lg ${
                                            audioEnabled 
                                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-blue-500/30 hover:shadow-blue-500/50' 
                                                : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 shadow-gray-500/30'
                                        }`}
                                    >
                                        {audioEnabled ? <Mic size={18} /> : <MicOff size={18} />}
                                        {audioEnabled ? "Mute" : "Unmute"}
                                    </button>
                                    <button 
                                        onClick={toggleVideo} 
                                        className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl font-semibold text-white transition-all shadow-lg ${
                                            videoEnabled 
                                                ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-purple-500/30 hover:shadow-purple-500/50' 
                                                : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 shadow-gray-500/30'
                                        }`}
                                    >
                                        {videoEnabled ? <Video size={18} /> : <VideoOff size={18} />}
                                        {videoEnabled ? "Cam" : "Cam"}
                                    </button>
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => callUser(idToCall, false)} 
                                        className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                                    >
                                        <Video size={18} /> Video
                                    </button>
                                    <button 
                                        onClick={() => callUser(idToCall, true)} 
                                        className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transition-all shadow-lg shadow-green-500/30 hover:shadow-green-500/50"
                                    >
                                        <Phone size={18} /> Audio
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
                {children}
            </div>
        </div>
    );
};

export default Options;
