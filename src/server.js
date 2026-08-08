import { createServer } from 'node:http';
import { Server } from 'socket.io';
import app from './app.js';
import { connectDB } from '../config/database.config.js';
import { envConfig } from '../config/env.config.js';
import { initSocket } from '../utils/socket.js';

const httpServer = createServer(app);
const io = new Server(httpServer);

initSocket(io);

io.on('connection', (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    });
});

const startServer = async () => {
    try {
        await connectDB();

        httpServer.listen(envConfig.port, () => {
            console.log(
                `${envConfig.appName} corriendo en http://localhost:${envConfig.port}`
            );
        });
    } catch (error) {
        console.log('No se pudo iniciar la aplicación:', error.message);
        process.exit(1);
    }
};

startServer();
