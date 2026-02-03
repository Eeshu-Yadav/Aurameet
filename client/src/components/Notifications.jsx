import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { PhoneIncoming } from 'lucide-react';

const Notifications = () => {
    const { answerCall, call, callAccepted } = useContext(SocketContext);

    return (
        <>
            {call.isReceivedCall && !callAccepted && (
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-xl border border-purple-500/30 animate-pulse shadow-lg">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500/30 rounded-lg">
                                <PhoneIncoming size={24} className="text-purple-300" />
                            </div>
                            <div>
                                <h1 className="text-lg text-white font-semibold">
                                    {call.name || 'Someone'} is calling
                                </h1>
                                <p className="text-sm text-purple-300">
                                    {call.isAudioCall ? 'Audio Call' : 'Video Call'}
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={answerCall} 
                            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all"
                        >
                            Answer
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Notifications;
