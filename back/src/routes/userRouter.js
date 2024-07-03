const { Router } = require('express');
const { registerUser, editUser, getUser } = require('../controllers/userController');
const upload = require('../utils/multerConfiguration');

const userRouter = Router();

userRouter.get('/by-email', getUser)
userRouter.post('/register', registerUser);
userRouter.put('/edit', upload, editUser);

module.exports = userRouter;