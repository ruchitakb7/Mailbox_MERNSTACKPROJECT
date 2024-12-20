const mongoose = require('mongoose'); // Import mongoose
const Schema = mongoose.Schema; // Correctly assign the Schema constructor

const ReceiptSchema = new Schema({
  emailId: {
    type: Schema.Types.ObjectId,
    ref: 'Mail', // Reference the Mail model
    required: true, // This field is mandatory
  },
  recipientId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference the User model
    required: true, // This field is mandatory
  },
  isDeleted: {
    type: Boolean,
    default: false, // Default value for isDeleted
  },
  isSeen: {
    type: Boolean,
    default: false, // Default value for isSeen
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Export the Receipt model
module.exports = mongoose.model('Receipt', ReceiptSchema);
