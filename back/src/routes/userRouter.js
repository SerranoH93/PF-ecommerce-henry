const { Router } = require('express');
const { registerUser, editUser, getUser } = require('../controllers/userController');

const userRouter = Router();

userRouter.get('/by-email', getUser)
userRouter.post('/register', registerUser);
userRouter.put('/edit', editUser);

module.exports = userRouter;