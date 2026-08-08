import express from 'express';
import { engine } from 'express-handlebars';
import bookingsRouter from '../routes/bookings.router.js';
import servicesRouter from '../routes/service.router.js';
import viewsRouter from '../routes/views.router.js';

const app = express();

app.engine(
    'handlebars',
    engine({
        extname: '.handlebars'
    })
);

app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/', viewsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/bookings', bookingsRouter);

export default app;