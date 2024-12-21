const express= require('express')
const router=express.Router()

const authenticatation=require('../middleware/auth')
const mailcontroller= require('../controllers/mail')

router.post('/compose',authenticatation.authenticate,mailcontroller.compose)

router.get('/mail/sent',authenticatation.authenticate,mailcontroller.sentMail)

router.get('/mail/inbox',authenticatation.authenticate,mailcontroller.fetchInbox)

router.delete('/mail/sent/delete/:id',authenticatation.authenticate,mailcontroller.deletebysender)

router.delete('/mail/inbox/delete/:id',authenticatation.authenticate,mailcontroller.deletefrominbox)

router.put('/mail/inbox/seen/:id',authenticatation.authenticate,mailcontroller.markasSeen)

module.exports=router