const shortToSocket = new Map();
const socketToShort = new Map();

const generateShortId = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = (io, socket) => {
    // Generate and assign Short ID
    let shortId = generateShortId();
    while (shortToSocket.has(shortId)) {
        shortId = generateShortId();
    }
    
    shortToSocket.set(shortId, socket.id);
    socketToShort.set(socket.id, shortId);

    // Emit the Short ID to the client
    socket.emit('me', shortId);
    console.log(`Socket ${socket.id} connected. Assigned Short ID: ${shortId}`);

    socket.on('disconnect', () => {
        socket.broadcast.emit("callEnded");
        const sId = socketToShort.get(socket.id);
        console.log(`Socket ${socket.id} disconnected. Removed Short ID: ${sId}`);
        if (sId) {
            shortToSocket.delete(sId);
            socketToShort.delete(socket.id);
        }
    });

    socket.on('callUser', ({ userToCall, signalData, from, name }) => {
        const socketIdToCall = shortToSocket.get(userToCall);
        if (socketIdToCall) {
            io.to(socketIdToCall).emit("callUser", { signal: signalData, from, name });
        } else {
            console.log("User not found:", userToCall);
            // Optionally emit an error back to caller
        }
    });

    socket.on("answerCall", (data) => {
        // 'data.to' from client is the caller's Short ID (because when we receive call, 'from' is short ID)
        // Wait, 'from' in callUser is 'me' (shortId).
        // So 'data.to' is shortId. We need to find socketId.
        const socketIdToAnswer = shortToSocket.get(data.to);
        if (socketIdToAnswer) {
            io.to(socketIdToAnswer).emit("callAccepted", data.signal);
        }
    });
};
