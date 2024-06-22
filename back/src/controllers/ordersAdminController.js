const getAllOrders = async (req, res) => {
    try {
        res.status(200).json({message: 'admin/orders'});
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

module.exports = {
    getAllOrders
    };