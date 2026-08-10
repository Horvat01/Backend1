import {
    getServices as getAllServices,
    getServiceById as getServiceByIdService,
    createService as createServiceService,
    updateService as updateServiceService,
    deleteService as deleteServiceService
} from '../services/service.service.js';

import { getIO } from '../utils/socket.js';

// GET /api/services
export const getServices = async (req, res) => {
    try {
        const {
            category,
            available,
            page,
            limit,
            sortBy,
            order
        } = req.query;

        const result = await getAllServices({
            category,
            available,
            page,
            limit,
            sortBy,
            order
        });

        res.status(200).json({
            status: 'success',
            payload: result.docs,
            total: result.total,
            page: result.page,
            limit: result.limit,
            totalPages: result.totalPages,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage
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

        const service = await getServiceByIdService(sid);

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
        const newService = await createServiceService(req.body);

        // Avisar que se creo un servicio
        getIO().emit('serviceCreated', newService);

        res.status(201).json({
            status: 'success',
            payload: newService
        });

    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

// PUT /api/services/:sid
export const updateService = async (req, res) => {
    try {
        const { sid } = req.params;

        const updatedService = await updateServiceService(
            sid,
            req.body
        );

        if (!updatedService) {
            return res.status(404).json({
                status: 'error',
                message: 'Servicio no encontrado'
            });
        }

        res.status(200).json({
            status: 'success',
            payload: updatedService
        });

    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

// DELETE /api/services/:sid
export const deleteService = async (req, res) => {
    try {
        const { sid } = req.params;

        const deletedService = await deleteServiceService(sid);

        if (!deletedService) {
            return res.status(404).json({
                status: 'error',
                message: 'Servicio no encontrado'
            });
        }

        res.status(200).json({
            status: 'success',
            payload: deletedService
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};