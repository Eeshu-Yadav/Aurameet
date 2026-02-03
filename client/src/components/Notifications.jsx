import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';

const Notifications = () => {
    const { answerCall, call, callAccepted } = useContext(SocketContext);

    return (
        <>
            {call.isReceivedCall && !callAccepted && (
                <div className="flex justify-center items-center p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 animate-pulse">
                    <h1 className="text-xl text-white font-semibold mr-5">
                        {call.name || 'Someone'} is calling ({call.isAudioCall ? 'Audio' : 'Video'})...
                    </h1> 
                    <button 
                        onClick={answerCall} 
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg shadow-green-500/30 transition-all"
                    >
                        Answer
                    </button>
                </div>
            )}
        </>
    );
};

export default Notifications;
