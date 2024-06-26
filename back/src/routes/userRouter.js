const { Router } = require('express');
const { registerUser, loginUser, editUser } = require('../controllers/userController');

const userRouter = Router();

userRouter.post('/register', registerUser);

userRouter.put('/edit', editUser);

module.exports = userRouter;