const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv= require('dotenv')
dotenv.config()

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const signuprouter=require('./routes/signuprouter')

app.use(signuprouter);



mongoose.connect(`mongodb+srv://ruchitakb7:${process.env.MONGODBPASS}@cluster0.0cb3i.mongodb.net/mailbox`)
.then(result=>{
    app.listen(PORT);
    console.log('connected!......');
})
.catch(err=>{
    console.log(err);
})
