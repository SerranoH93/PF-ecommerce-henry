const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Implementa tu lógica de filtro de archivo aquí si es necesario
        cb(null, true); // Acepta todos los archivos por ahora
    }
}).array('images');

module.exports = upload;