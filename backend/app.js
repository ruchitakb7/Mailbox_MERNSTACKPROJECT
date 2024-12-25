const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http= require('http')
const bodyParser = require("body-parser");
const dotenv= require('dotenv')
dotenv.config()

const app = express();
const PORT = 5000;

app.use(cors());
const server=http.createServer(app)
//global.io = require('socket.io')(server, { cors: { origin: '*' } });

global.io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


const signuprouter=require('./routes/signuprouter')
const loginrouter=require('./routes/loginrouter')
const mailrouter=require('./routes/mail')

app.use(signuprouter);
app.use(loginrouter)
app.use(mailrouter)

global.io.on("connection", (socket) => {
    console.log("WebSocket connected");
  
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });


mongoose.connect(`mongodb+srv://ruchitakb7:${process.env.MONGODBPASS}@cluster0.0cb3i.mongodb.net/mailbox?retryWrites=true&w=majority`)
.then(result=>{
    server.listen(PORT);
    console.log('connected!......');
})
.catch(err=>{
    console.log(err);
})
