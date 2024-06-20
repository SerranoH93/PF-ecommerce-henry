const getAllUsers = async (req, res) => {
    try {
        res.status(200).json({message: 'admin/Users'});
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

const getUserById = async (req, res) => {
    const {id} = req.params
    try {
        res.status(200).json({message: `admin/User = ${id}`});
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

const deleteUserById = async (req, res) => {
    const {id} = req.params
    try {
        res.status(200).json({message: `admin/delete = ${id}`});
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

const editUserById = async (req, res) => {
    const {id} = req.params
    try {
        res.status(200).json({message: `admin/edite = ${id}`});
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    deleteUserById,
    editUserById
    };