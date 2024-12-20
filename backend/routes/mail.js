const express= require('express')
const router=express.Router()

const authenticatation=require('../middleware/auth')
const mailcontroller= require('../controllers/mail')

router.post('/compose',authenticatation.authenticate,mailcontroller.compose)

router.get('/mail/sent',authenticatation.authenticate,mailcontroller.sentMail)

router.get('/mail/inbox',authenticatation.authenticate,mailcontroller.fetchInbox)

module.exports=router