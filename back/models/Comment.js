const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    createdAt: {
      type: Date,
    },
    updatedAt: Date,
    message: String,
    post: {
      type: Schema.Types.ObjectId,
      ref: 'comment',
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  { strict: false },
);

CommentSchema.pre('update', function preUpdate(next) {
  this.update({}, { $set: { updatedAt: Date.now() } });
  return next();
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
