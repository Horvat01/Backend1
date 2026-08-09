import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { engine } from 'express-handlebars';

import bookingsRouter from '../routes/bookings.router.js';
import servicesRouter from '../routes/service.router.js';
import viewsRouter from '../routes/views.router.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine(
    'handlebars',
    engine({
        extname: '.handlebars'
    })
);

app.set('view engine', 'handlebars');
app.set('views', './views');

// Middlewares
app.use(express.json());

app.use(
    express.static(
        path.join(__dirname, '../public')
    )
);

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Rutas de vistas
app.use('/', viewsRouter);
app.use('/views', viewsRouter);

// API REST
app.use('/api/services', servicesRouter);
app.use('/api/bookings', bookingsRouter);

export default app;


