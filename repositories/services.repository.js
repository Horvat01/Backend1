import * as serviceDao from '../dao/services.dao.js';

export const getAll = async () => {
    return await serviceDao.getAll();
};

export const getById = async (id) => {
    return await serviceDao.getById(id);
};

export const create = async (serviceData) => {
    return await serviceDao.create(serviceData);
};

export const update = async (id, serviceData) => {
    return await serviceDao.update(id, serviceData);
};

export const remove = async (id) => {
    return await serviceDao.remove(id);
};