import {
    getServices as getAllServices,
    getServicesById,
    addService,
    updateService,
    deleteService
} from '../managers/ServiceManager.js';


// GET /api/services
export const getServices = async (req, res) => {
    try {
        const { category, available } = req.query;

        let services = await getAllServices();

        if (category) {
            services = services.filter(
                (service) => service.category === category
            );
        }

        if (available) {
            services = services.filter(
                (service) => service.available === (available === 'true')
            );
        }

        res.status(200).json({
            status: 'success',
            payload: services
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};


// GET /api/services/:sid
export const getServiceById = async (req, res) => {
    try {
        const { sid } = req.params;

        const service = await getServicesById(sid);

        if (!service) {
            return res.status(404).json({
                status: 'error',
                message: 'Servicio no encontrado'
            });
        }

        res.status(200).json({
            status: 'success',
            payload: service
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};


// POST /api/services
export const createService = async (req, res) => {
    try {
        const result = await addService(req.body);

        if (result.status === 'error') {
            return res.status(400).json(result);
        }

        res.status(201).json(result);

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};


// PUT /api/services/:sid
export const updatedService = async (req, res) => {
    try {
        const { sid } = req.params;

        const result = await updateService(sid, req.body);

        if (result.status === 'error') {
            return res.status(404).json(result);
        }

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};


// DELETE /api/services/:sid
export const deletedService = async (req, res) => {
    try {
        const { sid } = req.params;

        const result = await deleteService(sid);

        if (result.status === 'error') {
            return res.status(404).json(result);
        }

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};