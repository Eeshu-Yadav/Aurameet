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

    return (
        <div className="flex justify-center flex-wrap gap-5 mt-5">
            {/* Our own video */}
            {stream && (
                <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                    <div className="relative rounded-lg overflow-hidden w-[300px] md:w-[550px] aspect-video bg-black flex items-center justify-center">
                        <h3 className="absolute bottom-2 left-2 text-white bg-black/50 px-3 py-1 rounded z-10 text-sm">
                            {name || 'Me'}
                        </h3>
                        <video 
                            playsInline 
                            muted 
                            ref={myVideo} 
                            autoPlay 
                            className="w-full h-full rounded-lg block object-cover scale-x-[-1]" 
                        />
                    </div>
                </div>
            )}

            {/* User's video */}
            {callAccepted && !callEnded && (
                <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                    <div className="relative rounded-lg overflow-hidden w-[300px] md:w-[550px] aspect-video bg-black flex items-center justify-center">
                        <h3 className="absolute bottom-2 left-2 text-white bg-black/50 px-3 py-1 rounded z-10 text-sm">
                            {call.name || 'Caller'}
                        </h3>
                        {call.isAudioCall ? (
                            <div className="flex flex-col items-center justify-center text-white/50">
                                <User size={100} />
                                <p className="mt-4 font-semibold">Audio Call</p>
                            </div>
                        ) : (
                            <video 
                                playsInline 
                                ref={userVideo} 
                                autoPlay 
                                controls
                                className="w-full h-full rounded-lg block object-cover" 
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;
