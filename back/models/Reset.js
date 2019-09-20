const mongoose = require('mongoose');

const { Schema } = mongoose;

const ResetSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  token: String,
});

const Reset = mongoose.model('reset', ResetSchema);

module.exports = Reset;
