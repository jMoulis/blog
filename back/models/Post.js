const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    topic: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    image: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    updatedAt: Date,
    description: String,
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'comment',
      },
    ],
  },
  // { strict: false },
);

PostSchema.pre('update', function preUpdate(next) {
  this.update({}, { $set: { updatedAt: Date.now() } });
  return next();
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
