const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const ReceiptSchema = new Schema({
  emailId: {
    type: Schema.Types.ObjectId,
    ref: 'Mail', 
    required: true, 
  },
  recipientId: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true, 
  },
  isDeleted: {
    type: Boolean,
    default: false, 
  },
  isSeen: {
    type: Boolean,
    default: false, 
  },
}, {
  timestamps: true, 
});

module.exports = mongoose.model('Receipt', ReceiptSchema);
