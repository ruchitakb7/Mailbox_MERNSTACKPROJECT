const mongoose=require('mongoose')
const Schema=mongoose.Schema
const User=require('./user')

const mailSchema= new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    to:{
         type:String,
         required:true
    },
    subject: {
        type: String,
        default: "No Subject",
      },
      content: {
        type: String,
        allowNull: false,
      },
      createdAt: {
        type: Date,
        defaul: Date.now,
      },


})
module.exports=mongoose.model('Mail',mailSchema);
