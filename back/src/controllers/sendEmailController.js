const sendWelcomeEmail = async (req, res) => {
    try {
        res.status(200).json({message: 'admin/sendWelcome'});
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

const resetPasswordEmail = async (req, res) => {
    try {
        res.status(200).json({message: 'admin/resetPassword'});
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

module.exports = {
    sendWelcomeEmail,
    resetPasswordEmail
    };