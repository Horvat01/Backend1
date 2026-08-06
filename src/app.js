import express, { json } from 'express';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Hola mundo');
});

const services = [
    {
        id: 1,
        name: 'Service de porton',
        duration: 60,
        price: 1800,
        category: 'consulta',
        available: true,
    },
    {
        id: 2,
        name: 'Reparacion de porton',
        duration: 120,
        price: 3000,
        category: 'reparacion',
        available: true,
    }
];

//  todos los servicios o filtrar por categoría
app.get('/api/services', (req, res) => {
    const { category } = req.query;

    let filteredServices = services;

    if (category) {
        filteredServices = services.filter(
            (service) => service.category === category
        );
    }

    res.status(200).json({
        status: 'success',
        payload: filteredServices
    });
});

// un servicio por ID
app.get('/api/services/:sid', (req, res) => {
    const { sid } = req.params;

    const service = services.find(
        (service) => service.id === Number(sid)
    );

    if (!service) {
        return res.status(404).json({
            status: 'error',
            message: 'Servicio no encontrado.'
        });
    }

    res.status(200).json({
        status: 'success',
        payload: service
    });
});

// nuevo servicio
app.post('/api/services', (req, res) => {
    const { name, duration, price, category, available } = req.body;

    if (!name || !duration || !price || !category) {
        return res.status(400).json({
            status: 'error',
            message: 'Faltan campos obligatorios.'
        });
    }

    const newService = {
        id: services.length + 1,
        name,
        duration,
        price,
        category,
        available: available ?? true
    };

    services.push(newService);

    res.status(201).json({
        status: 'success',
        payload: newService
    });
});

// actualizar un servicio
app.put('/api/services/:sid', (req, res) => {
    const { sid } = req.params;

    const serviceIndex = services.findIndex(
        (service) => service.id === Number(sid)
    );

    if (serviceIndex === -1) {
        return res.status(404).json({
            status: 'error',
            message: 'Servicio no encontrado'
        });
    }

    const updatedService = {
        ...services[serviceIndex],
        ...req.body,
        id: services[serviceIndex].id
    };

    services[serviceIndex] = updatedService;

    res.status(200).json({
        status: 'success',
        payload: updatedService
    });
});


// eliminar un servicio
app.delete('/api/services/:sid', (req, res) => {
    const { sid } = req.params;

    const serviceIndex = services.findIndex(
        (service) => service.id === Number(sid)
    );

    if (serviceIndex === -1) {
        return res.status(404).json({
            status: 'error',
            message: 'Servicio no encontrado'
        });
    }

    const deletedService = services.splice(serviceIndex, 1);

    res.status(200).json({
        status: 'success',
        payload: deletedService[0]
    });
});