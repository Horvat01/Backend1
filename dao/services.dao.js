import { ServiceModel } from './models/service.model.js';

export const getAll = async ({
    category,
    available,
    page = 1,
    limit = 10,
    sort
}) => {

    const filter = {};

    if (category) {
        filter.category = category;
    }

    if (available !== undefined) {
        filter.available = available === 'true';
    }

    let sortOption = {};

    if (sort === 'asc') {
        sortOption = { price: 1 };
    }

    if (sort === 'desc') {
        sortOption = { price: -1 };
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
        totalPages,
        page,
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
