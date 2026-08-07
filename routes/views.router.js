import { Router } from 'express';


const router = Router();


router.get('/', (req, res) => {

    res.render('home', {
        title: 'Inicio'
    });

});


router.get('/services', (req, res) => {

    res.render('services', {
        title: 'Servicios'
    });

});


router.get('/bookings', (req, res) => {

    res.render('bookings', {
        title: 'Reservas'
    });

});


export default router;