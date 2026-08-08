import fs from 'node:fs/promises';

const filePath = './src/data/services.json';

const readServices = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeServices = async (services) => {
    await fs.writeFile(
        filePath,
        JSON.stringify(services, null, 2)
    );
};

export const getAll = async () => {
    return readServices();
};

export const getById = async (id) => {
    const services = await readServices();

    return services.find(
        service => service.id === Number(id)
    ) || null;
};

export const create = async (serviceData) => {
    const services = await readServices();

    const newService = {
        id: services.length > 0
            ? services[services.length - 1].id + 1
            : 1,
        ...serviceData
    };

    services.push(newService);

    await writeServices(services);

    return newService;
};

export const update = async (id, serviceData) => {
    const services = await readServices();

    const serviceIndex = services.findIndex(
        service => service.id === Number(id)
    );

    if (serviceIndex === -1) {
        return null;
    }

    const updatedService = {
        ...services[serviceIndex],
        ...serviceData,
        id: services[serviceIndex].id
    };

    services[serviceIndex] = updatedService;

    await writeServices(services);

    return updatedService;
};

export const deleteService = async (id) => {
    const services = await readServices();

    const serviceIndex = services.findIndex(
        service => service.id === Number(id)
    );

    if (serviceIndex === -1) {
        return null;
    }

    const deletedService = services.splice(serviceIndex, 1)[0];

    await writeServices(services);

    return deletedService;
};