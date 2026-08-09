import { ServiceModel } from './models/service.model.js';

export const getAll = async () => {
    return ServiceModel.find();
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
