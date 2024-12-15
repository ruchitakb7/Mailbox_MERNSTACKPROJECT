const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv= require('dotenv')
dotenv.config()

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


const signuprouter=require('./routes/signuprouter')
const loginrouter=require('./routes/loginrouter')

app.use(signuprouter);
app.use(loginrouter)



mongoose.connect(`mongodb+srv://ruchitakb7:${process.env.MONGODBPASS}@cluster0.0cb3i.mongodb.net/mailbox?retryWrites=true&w=majority`)
.then(result=>{
    app.listen(PORT);
    console.log('connected!......');
})
.catch(err=>{
    console.log(err);
})
