const mongoose=require('mongoose')
const Schema=mongoose.Schema
const User=require('./user')

const mailSchema= new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    subject: {
        type: String,
        defaultValue: "No Subject",
      },
      body: {
        type: Text,
        allowNull: false,
      },
      isDeleted: {
        type: Boolean,
        defaultValue: false,
      },
      isSeen: {
        type: Boolean,
        defaultValue: false,
      },
      createdAt: {
        type: Date,
        defaultValue: DataTypes.NOW,
      },


})
module.exports=mongoose.model('Mail',mailSchema);
