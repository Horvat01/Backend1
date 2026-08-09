export const getHome = async (req, res) => {
    try {
        res.render('home', {
            title: 'Inicio'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

export const getBookingsView = async (req, res) => {
    try {
        res.render('bookings', {
            title: 'Reservas'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

export const getServicesView = async (req, res) => {
    try {
        res.render('services', {
            title: 'Servicios'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

export const getRealtimeServicesView = async (req, res) => {
    try {
        res.render('realtime-services', {
            title: 'Servicios en tiempo real'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

export const renderBooking = async (req, res) => {
    try {
        const { bid } = req.params;

        res.render('booking', {
            title: 'Detalle de reserva',
            bookingId: bid
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

export const renderServices = async (req, res) => {
    return getServicesView(req, res);
};

export const renderRealtimeServices = async (req, res) => {
    return getRealtimeServicesView(req, res);
};

