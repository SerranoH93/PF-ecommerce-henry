const supportedImageFormats = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
];

function validateImages(files) {
    const errors = [];

    console.log(files, "validacion")

    files.forEach((file, index) => {
        if (!file || !file.mimetype) {
            errors.push({
                fileIndex: index,
                message: "No se encontró ningún archivo adjunto o el tipo de archivo no es válido."
            });
            return;
        }

        if (!supportedImageFormats.includes(file.mimetype)) {
            errors.push({
                fileIndex: index,
                message: "Formato de imagen no válido. Solo se permiten JPEG, JPG, PNG y WEBP."
            });
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            errors.push({
                fileIndex: index,
                message: "El tamaño de la imagen no debe exceder los 10MB."
            });
            return;
        }
    });

    return {
        valid: errors.length === 0,
        errors: errors,
    };
}

module.exports = validateImages;