const { Router } = require('express');
const { registerUser, loginUser, editUser } = require('../controllers/userController');

const userRouter = Router();

userRouter.get('/register', registerUser);
userRouter.get('/login', loginUser);
userRouter.put('/edit', editUser);

module.exports = userRouter;