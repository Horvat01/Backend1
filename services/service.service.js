import * as serviceRepository from '../repositories/services.repository.js';

export const getServices = async (filters) => {
    return serviceRepository.getAll(filters);
};

export const getServiceById = async (id) => {
    return serviceRepository.getById(id);
};

export const createService = async (serviceData) => {
    const {
        name,
        description,
        duration,
        price,
        category,
        available
    } = serviceData;

    if (!name || !description || !duration || !price || !category) {
        throw new Error('Faltan campos obligatorios.');
    }

    if (price < 0) {
        throw new Error('El precio no puede ser negativo.');
    }

    const newService = {
        name,
        description,
        duration,
        price,
        category,
        available: available ?? true
    };

    return serviceRepository.create(newService);
};

export const updateService = async (id, serviceData) => {
    const existingService = await serviceRepository.getById(id);

    if (!existingService) {
        return null;
    }

    if (serviceData.price !== undefined && serviceData.price < 0) {
        throw new Error('El precio no puede ser negativo.');
    }

    return serviceRepository.update(id, serviceData);
};

export const deleteService = async (id) => {
    return serviceRepository.remove(id);
};
