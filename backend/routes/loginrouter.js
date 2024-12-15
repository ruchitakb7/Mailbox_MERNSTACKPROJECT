const express= require('express');
const router= express.Router()

const controllerpage= require('../controllers/login.js');

router.post('/login',controllerpage.login);

module.exports=router;



