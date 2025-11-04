const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },

  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  },

  content: {
    type: String,
    default: ''
  },

  type: {
    type: String,
    enum: ['text', 'image', 'file'],
    default: 'text'
  },

  attachments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Attachment'
    }
  ],

  isRead: {
    type: Boolean,
    default: false
  },

  isDeleted: {
    type: Boolean,
    default: false
  },

  deletedAt: {
    type: Date,
    default: null
  }

}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
