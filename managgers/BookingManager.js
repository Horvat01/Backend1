import fs from 'node:fs/promises';

const filePath = './src/data/bookings.json';

const readBookings = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeBookings = async (bookings) => {
    await fs.writeFile(
        filePath,
        JSON.stringify(bookings, null, 2)
    );
};


// Crear una reserva
export const createBooking = async (bookingData) => {
    const bookings = await readBookings();

    const newBooking = {
        id: bookings.length > 0
            ? bookings[bookings.length - 1].id + 1
            : 1,
        ...bookingData,
        services: bookingData.services || []
    };

    bookings.push(newBooking);

    await writeBookings(bookings);

    return newBooking;
};


// Obtener una reserva por ID
export const getBookingById = async (id) => {
    const bookings = await readBookings();

    const booking = bookings.find(
        (booking) => booking.id === Number(id)
    );

    return booking || null;
};


// Agregar un servicio a una reserva
export const addServiceToBooking = async (bookingId, serviceId) => {
    const bookings = await readBookings();

    const bookingIndex = bookings.findIndex(
        (booking) => booking.id === Number(bookingId)
    );

    if (bookingIndex === -1) {
        return null;
    }

    const booking = bookings[bookingIndex];

    if (!booking.services) {
        booking.services = [];
    }

    const serviceIdNumber = Number(serviceId);

    // Evita agregar el mismo servicio dos veces
    if (!booking.services.includes(serviceIdNumber)) {
        booking.services.push(serviceIdNumber);
    }

    bookings[bookingIndex] = booking;

    await writeBookings(bookings);

    return booking;
};