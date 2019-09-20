const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
    },
    password: String,
    firstName: String,
    lastName: String,
    picture: Object,
    description: [],
    createdAt: {
      type: Date,
      default: new Date(),
    },
    updatedAt: Date,
    isActive: Boolean,
    ipsConnection: Array,
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  // { strict: false },
);

UserSchema.pre('update', function preUpdate(next) {
  this.update({}, { $set: { updatedAt: new Date() } });
  return next();
});
const User = mongoose.model('user', UserSchema);

module.exports = User;
