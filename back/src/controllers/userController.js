const { User } = require("../db");
const validateImages = require('../validations/filesValidations');
const uploadImage = require('../utils/cloudinaryConfiguration');

const registerUser = async (req, res) => {
  try {
    const { user } = req.body;

    if (!user) {
      return res.status(400).send("User data is required");
    }

    const { email, email_verified, name, nickname, picture } = user;

    let existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(200).send("Existing User");
    } else {
      const newUser = await User.create({
        email,
        email_verified,
        name,
        nickname,
        picture,
      });

      return res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

        const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en la base de datos", error: error.message });
  }
};

const editUser = async (req, res) => {
  try {
    const { email } = req.query;
    const { name, phone, address } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }    

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //* Validación para imagenes 
    const validationResult = validateImages(req.files);
    if (!validationResult.valid) {
      return res.status(400).json({
        message: "Uno o más archivos no son válidos.",
        errors: validationResult.errors,
      });
    }

    //* Si pasan las validaciones se guarda la imagen
    const files = req.files;
    const uniqueField = user.id;
    const imagesUrl = [];

    for (let i = 0; i < files.length; i++) {
      const fileBuffer = files[i].buffer;
      const result = await uploadImage('user', uniqueField, fileBuffer, i);
      imagesUrl.push(result.secure_url);
    }

    await User.update(
      {
        name: name ?? user.name,
        picture: imagesUrl[0],
        phone: phone ?? user.phone,
        address: address ?? user.address,
      },
      {
        where: { email },
      }
    );

    const updatedUser = await User.findOne({ where: { email } });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error en la base de datos", error: error.message });
  }
};

module.exports = {
  registerUser,
  editUser,
  getUser,
};
