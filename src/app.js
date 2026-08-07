import express from 'express';

import servicesRouter from './routes/services.router.js';
import bookingsRouter from './routes/bookings.router.js';
import viewsRouter from './routes/views.router.js';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/api/view.routes.js', viewRoutes);
app.use('/api/services', servicesRouter);
app.use('/api/bookings', bookingsRouter);

export default app;