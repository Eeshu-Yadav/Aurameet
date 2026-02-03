import React, { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Copy, Phone, PhoneOff, Mic, MicOff, Video, VideoOff } from 'lucide-react';

const Options = ({ children }) => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser, toggleAudio, audioEnabled, toggleVideo, videoEnabled } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');

    return (
        <div className="flex justify-center my-5 px-4">
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 w-full max-w-2xl">
                <form className="flex flex-col" noValidate autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col md:flex-row gap-5 justify-between">
                        {/* Account Info */}
                        <div className="flex-1 flex flex-col gap-3">
                            <h6 className="text-gray-300 text-sm font-semibold uppercase tracking-wider">Account Info</h6>
                            <input 
                                className="w-full p-3 rounded-lg border border-white/20 bg-black/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                                placeholder="Name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            />
                            <div className="flex items-center gap-2 bg-black/40 p-2 rounded-lg border border-white/10">
                                <span className="text-xs text-gray-400 font-mono flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                                    ID: {me}
                                </span>
                                <button 
                                    className="text-gray-400 hover:text-white transition-colors p-1" 
                                    onClick={() => navigator.clipboard.writeText(me)}
                                    title="Copy ID"
                                >
                                    <Copy size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Make a Call */}
                        <div className="flex-1 flex flex-col gap-3">
                            <h6 className="text-gray-300 text-sm font-semibold uppercase tracking-wider">Make a Call</h6>
                            <input 
                                className="w-full p-3 rounded-lg border border-white/20 bg-black/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                                placeholder="ID to Call" 
                                value={idToCall} 
                                onChange={(e) => setIdToCall(e.target.value)} 
                            />
                            {callAccepted && !callEnded ? (
                                <div className="flex gap-2">
                                    <button 
                                        onClick={leaveCall} 
                                        className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg font-bold bg-red-500 hover:bg-red-600 text-white transition-all shadow-lg shadow-red-500/30"
                                    >
                                        <PhoneOff size={18} /> Hang Up
                                    </button>
                                    <button 
                                        onClick={toggleAudio} 
                                        className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg font-bold text-white transition-all shadow-lg ${audioEnabled ? 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/30' : 'bg-red-500 hover:bg-red-600 shadow-red-500/30'}`}
                                    >
                                        {audioEnabled ? <Mic size={18} /> : <MicOff size={18} />}
                                        {audioEnabled ? "Mute" : "Unmute"}
                                    </button>
                                    <button 
                                        onClick={toggleVideo} 
                                        className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg font-bold text-white transition-all shadow-lg ${videoEnabled ? 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/30' : 'bg-red-500 hover:bg-red-600 shadow-red-500/30'}`}
                                    >
                                        {videoEnabled ? <Video size={18} /> : <VideoOff size={18} />}
                                        {videoEnabled ? "Cam On" : "Cam Off"}
                                    </button>
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => callUser(idToCall, false)} 
                                        className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg font-bold bg-blue-500 hover:bg-blue-600 text-white transition-all shadow-lg shadow-blue-500/30"
                                    >
                                        <Video size={18} /> Video Call
                                    </button>
                                    <button 
                                        onClick={() => callUser(idToCall, true)} 
                                        className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg font-bold bg-green-500 hover:bg-green-600 text-white transition-all shadow-lg shadow-green-500/30"
                                    >
                                        <Phone size={18} /> Audio Call
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
