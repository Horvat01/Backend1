import mongoose from 'mongoose';
import { envConfig } from './env.config.js';

export const connectDB = async () => {
    if (!envConfig.mongoUri) {
        throw new Error('Falta configurar MONGO_URI en el archivo .env');
    }

    try {
        await mongoose.connect(envConfig.mongoUri);
        console.log('Conexión a MongoDB exitosa');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error.message);
        process.exit(1);
    }
};