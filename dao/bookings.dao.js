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

export const create = async (bookingData) => {
    const bookings = await readBookings();

    const newBooking = {
        id: bookings.length > 0
            ? bookings[bookings.length - 1].id + 1
            : 1,
        ...bookingData
    };

    bookings.push(newBooking);

    await writeBookings(bookings);

    return newBooking;
};

export const getById = async (id) => {
    const bookings = await readBookings();

    return bookings.find(
        booking => booking.id === Number(id)
    ) || null;
};

export const update = async (id, bookingData) => {
    const bookings = await readBookings();

    const bookingIndex = bookings.findIndex(
        booking => booking.id === Number(id)
    );

    if (bookingIndex === -1) {
        return null;
    }

    const updatedBooking = {
        ...bookings[bookingIndex],
        ...bookingData,
        id: bookings[bookingIndex].id
    };

    bookings[bookingIndex] = updatedBooking;

    await writeBookings(bookings);

    return updatedBooking;
};