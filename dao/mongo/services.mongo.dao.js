import { ServiceModel } from '../models/service.model.js';

export const getAll = async ({
    category,
    available,
    page = 1,
    limit = 10,
    sortBy,
    order
}) => {

    const filter = {};

    // Filtro por categoría
    if (category) {
        filter.category = category;
    }

    // Filtro por disponibilidad
    if (available !== undefined) {
        filter.available = available === 'true';
    }

    // Ordenamiento
    let sortOption = {};

    if (sortBy) {
        sortOption[sortBy] = order === 'desc' ? -1 : 1;
    }

    page = Number(page);
    limit = Number(limit);

    const skip = (page - 1) * limit;

    const totalDocs = await ServiceModel.countDocuments(filter);

    const services = await ServiceModel.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limit);

    const totalPages = Math.ceil(totalDocs / limit);

    return {
        docs: services,
        total: totalDocs,
        page,
        limit,
        totalPages,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page < totalPages ? page + 1 : null
    };
};

export const getById = async (id) => {
    return ServiceModel.findById(id);
};

export const create = async (serviceData) => {
    return ServiceModel.create(serviceData);
};

export const update = async (id, serviceData) => {
    return ServiceModel.findByIdAndUpdate(
        id,
        serviceData,
        {
            new: true,
            runValidators: true
        }
    );
};

export const deleteService = async (id) => {
    return ServiceModel.findByIdAndDelete(id);
};


export const servicesMongoDao = {
    getAll,
    getById,
    create,
    update,
    delete: deleteService
};