import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import axios from 'axios';

const SocketContext = createContext();

const socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000', {
    autoConnect: false,
});

const ContextProvider = ({ children }) => {
    const [stream, setStream] = useState(null);
    const [me, setMe] = useState('');
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        console.log("SocketContext: Initializing...");

        // Fetch user info if logged in
        const token = localStorage.getItem('token');
        if (token) {
            const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
            axios.get(`${BACKEND_URL}/api/auth/me`, {
                headers: { 'x-auth-token': token }
            })
            .then(res => {
                if(res.data.username) {
                    setName(res.data.username);
                }
            })
            .catch(err => console.error("Failed to fetch user:", err));
        }
        
        // Setup listeners before connecting
        socket.on('me', (id) => {
            console.log("Received Short ID:", id);
            setMe(id);
        });

        socket.on('callUser', ({ from, name: callerName, signal, isAudioCall }) => {
            console.log("Incoming call from:", from, "AudioOnly:", isAudioCall);
            setCall({ isReceivedCall: true, from, name: callerName, signal, isAudioCall });
        });

        socket.on('connect', () => {
             console.log("Socket Connected:", socket.id);
        });
        
        socket.connect();

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);
                if (myVideo.current) {
                    myVideo.current.srcObject = currentStream;
                }
            })
            .catch((err) => {
                console.error("Error accessing media devices:", err);
                alert("Could not access camera/microphone. Please allow permissions.");
            });
            
        return () => {
            socket.off('me');
            socket.off('callUser');
            socket.off('connect');
        };
    }, []);

    const answerCall = () => {
        setCallAccepted(true);
        
        if (call.isAudioCall) {
             const videoTrack = stream.getVideoTracks()[0];
             if (videoTrack) videoTrack.enabled = false;
        }

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from });
        });

        peer.on('stream', (currentStream) => {
            console.log("Peer stream received (Answer). Audio tracks:", currentStream.getAudioTracks().length);
            if (userVideo.current) {
                userVideo.current.srcObject = currentStream;
            }
        });

        peer.signal(call.signal);
        connectionRef.current = peer;
    };

    const callUser = (id, isAudioCall = false) => {
        if (!id) {
            alert("Please enter an ID to call!");
            return;
        }

        if (isAudioCall) {
             const videoTrack = stream.getVideoTracks()[0];
             if (videoTrack) videoTrack.enabled = false;
        }
        
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, signalData: data, from: me, name, isAudioCall });
        });

        peer.on('stream', (currentStream) => {
            console.log("Peer stream received (Call). Audio tracks:", currentStream.getAudioTracks().length);
            if (userVideo.current) {
                userVideo.current.srcObject = currentStream;
            }
        });

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);
        if (connectionRef.current) { 
             connectionRef.current.destroy();
        }
        window.location.reload();
    };

    const [audioEnabled, setAudioEnabled] = useState(true);
    const [videoEnabled, setVideoEnabled] = useState(true);

    const toggleAudio = () => {
        if(stream) {
            const audioTrack = stream.getAudioTracks()[0];
            if(audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setAudioEnabled(audioTrack.enabled);
            }
        }
    };

    const toggleVideo = () => {
        if(stream) {
            const videoTrack = stream.getVideoTracks()[0];
            if(videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setVideoEnabled(videoTrack.enabled);
            }
        }
    };

    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callEnded,
            me,
            callUser,
            leaveCall,
            answerCall,
            audioEnabled,
            toggleAudio,
            videoEnabled,
            toggleVideo
        }}>
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };
