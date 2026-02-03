import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { User } from 'lucide-react';

const VideoPlayer = () => {
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);

    React.useEffect(() => {
        if (stream && myVideo.current) {
            myVideo.current.srcObject = stream;
        }
    }, [stream, myVideo]);

    React.useEffect(() => {
        if (callAccepted && userVideo.current && userVideo.current.srcObject) {
            userVideo.current.play().catch(err => console.log("Video play error:", err));
        }
    }, [callAccepted, userVideo]);

    return (
        <div className="flex justify-center flex-wrap gap-6 mt-5">
            {/* Our own video */}
            {stream && (
                <div className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative p-3 rounded-2xl bg-slate-800/90 backdrop-blur-xl border border-white/10 shadow-2xl">
                        <div className="relative rounded-xl overflow-hidden w-[300px] md:w-[550px] aspect-video bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                            <div className="absolute bottom-3 left-3 px-4 py-2 bg-gradient-to-r from-blue-500/80 to-purple-500/80 backdrop-blur-sm rounded-lg z-10">
                                <span className="text-white font-semibold text-sm">{name || 'Me'}</span>
                            </div>
                            <video 
                                playsInline 
                                muted 
                                ref={myVideo} 
                                autoPlay 
                                className="w-full h-full rounded-xl block object-cover scale-x-[-1]" 
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* User's video */}
            {callAccepted && !callEnded && (
                <div className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative p-3 rounded-2xl bg-slate-800/90 backdrop-blur-xl border border-white/10 shadow-2xl">
                        <div className="relative rounded-xl overflow-hidden w-[300px] md:w-[550px] aspect-video bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                            <div className="absolute bottom-3 left-3 px-4 py-2 bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-sm rounded-lg z-10">
                                <span className="text-white font-semibold text-sm">{call.name || 'Caller'}</span>
                            </div>
                            {call.isAudioCall ? (
                                <div className="flex flex-col items-center justify-center text-purple-300/50">
                                    <div className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full mb-4">
                                        <User size={80} />
                                    </div>
                                    <p className="text-lg font-semibold">Audio Call</p>
                                </div>
                            ) : (
                                <video 
                                    playsInline 
                                    ref={userVideo} 
                                    autoPlay 
                                    className="w-full h-full rounded-xl block object-contain bg-black" 
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;
