import express from 'express';
import bookingsRouter from '../routes/bookings.router.js';
import servicesRouter from '../routes/service.router.js';
import viewsRouter from '../routes/views.router.js';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/', viewsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/bookings', bookingsRouter);

export default app;