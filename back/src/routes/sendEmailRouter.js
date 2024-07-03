const { Router } = require('express');
const { sendWelcomeEmail, resetPasswordEmail } = require('../controllers/sendEmailController');
const sendEmailRouter = Router();
const upload = require('../utils/multerConfiguration');

sendEmailRouter.post('/sendWelcome', upload, sendWelcomeEmail);
sendEmailRouter.post('/resetPassword', upload, resetPasswordEmail);

module.exports = sendEmailRouter;