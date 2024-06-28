const cloudinary = require('cloudinary').v2;
require('dotenv').config();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const uploadImage = async (model, uniqueField, fileBuffer, index) => {
    const result = await new Promise((res, rej) => {
        const options = {};

        switch (model) {
            case 'product':
                options.public_id = `${uniqueField}_id_${index}`;
                options.folder = 'products';
                options.unique_filename = false;
                break;
            //* Agrega más modelos aquí
            
            default:
                return rej(new Error('Unsupported model type'));
        }

        cloudinary.uploader
            .upload_stream(
                {
                    ...options,
                    overwrite: true,
                },
                (error, uploadResult) => {
                    if (error) {
                        return rej(error);
                    }

                    return res(uploadResult);
                }
            )
            .end(fileBuffer);
    });

    return result;
    
};

module.exports = uploadImage;