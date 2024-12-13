const express= require('express');
const router= express.Router()

const controllerpage= require('../controllers/signup.js');

router.post('/signup',controllerpage.signupdetails);

module.exports=router;



