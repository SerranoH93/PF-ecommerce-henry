const { Router } = require('express');
const { getAllUsers, banUser, setAdmin } = require('../controllers/usersController');
const usersRouter = Router();

usersRouter.get('/', getAllUsers);
usersRouter.put('/setAdmin', setAdmin);
usersRouter.put('/ban', banUser);

module.exports = usersRouter;