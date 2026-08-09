import { servicesMongoDao } from '../dao/mongo/services.mongo.dao.js';

export const getAll = async (filters = {}) => {
    return await servicesMongoDao.getAll(filters);
};

export const getById = async (id) => {
    return await servicesMongoDao.getById(id);
};

export const create = async (serviceData) => {
    return await servicesMongoDao.create(serviceData);
};

export const update = async (id, serviceData) => {
    return await servicesMongoDao.update(id, serviceData);
};

export const remove = async (id) => {
    return await servicesMongoDao.delete(id);
};
