const mongoose=require('mongoose')
const Schema=mongoose.Schema
const User=require('./user')

const mailSchema= new Schema({
    senderId:{
        type:Schema.Types.ObjectId,
        ref:'User',
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
      isDeleted: {
        type: Boolean,
        default: false, // Default value for isDeleted
      },
      isSeen: {
        type: Boolean,
        default: false, // Default value for isSeen
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },


})
module.exports=mongoose.model('Mail',mailSchema);
