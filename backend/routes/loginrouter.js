const express= require('express');
const router= express.Router()

const controllerpage= require('../controllers/login.js');

router.post('/login',controllerpage.login);

router.post('/forgot-password',controllerpage.forgotPassword)

module.exports=router;



