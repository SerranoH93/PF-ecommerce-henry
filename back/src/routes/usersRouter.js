const { Router } = require('express');
const { getAllUsers, getUserById, deleteUserById, editUserById } = require('../controllers/usersController');
const usersRouter = Router();

usersRouter.get('/', getAllUsers);
usersRouter.get('/:id', getUserById);
usersRouter.delete('/delete/:id', deleteUserById);
usersRouter.put('/edit/:id', editUserById)


module.exports = usersRouter;