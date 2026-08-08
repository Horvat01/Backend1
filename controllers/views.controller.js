export const getHome = async (req, res) => {
    try {
        res.render('home');
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};


export const getBookingsView = async (req, res) => {
    try {
        res.render('bookings');
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};


export const getServicesView = async (req, res) => {
    try {
        res.render('services');
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};