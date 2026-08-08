let io;

export const initSocket = (socketIo) => {
    io = socketIo;
};

export const getIO = () => {
    if (!io) {
        throw new Error('Socket.IO no ha sido inicializado');
    }

    return io;
};