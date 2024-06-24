const { Router } = require('express');
const { sendWelcomeEmail, resetPasswordEmail } = require('../controllers/sendEmailController');
const sendEmailRouter = Router();

sendEmailRouter.post('/sendWelcome', sendWelcomeEmail);
sendEmailRouter.post('/resetPassword', resetPasswordEmail);

module.exports = sendEmailRouter;