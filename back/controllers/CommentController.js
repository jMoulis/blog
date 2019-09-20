const Api = require('../services/Api');
const Comment = require('../models/Comment');
const Post = require('../models/Post');

module.exports = {
  findAll: async (req, res, next) => {
    if (!req.body) next(new Error('No body found'));
    const api = new Api(res, req);
    try {
      const comments = await Comment.find({ post: req.query.post }).populate({
        path: 'author',
        ref: 'user',
        select: 'firstName lastName picture',
      });

      return api.success({
        comments,
      });
    } catch (error) {
      return api.failure(error, 422, 'Error while processing');
    }
  },

  create: async (req, res, next) => {
    if (!req.body) next(new Error('No body found'));
    const api = new Api(res, req);
    try {
      const newComment = await Comment.create({
        ...req.body,
        createdAt: Date.now(),
      });

      const comments = await Comment.find({ post: req.body.post }).populate({
        path: 'author',
        ref: 'user',
        select: 'firstName lastName picture',
      });

      await Post.updateOne(
        { _id: req.body.post },
        {
          $addToSet: {
            comments: newComment._id,
          },
        },
      );

      return api.success({
        comments,
      });
    } catch (error) {
      return api.failure(error, 422);
    }
  },

  read: async (req, res, next) => {
    if (!req.body) next(new Error('No body found'));
    const api = new Api(res, req);
    try {
      const comment = await Comment.findOne({
        _id: req.params.commentId,
      }).populate({
        path: 'author',
        ref: 'user',
        select: 'firstName lastName picture',
      });
      return api.success({
        comment,
      });
    } catch (error) {
      return api.failure(error, 422);
    }
  },

  edit: async (req, res, next) => {
    if (!req.body) next(new Error('No body found'));
    const api = new Api(res, req);
    try {
      await Comment.updateOne({ _id: req.params.commentId }, { ...req.body });
      const comment = await Comment.findOne({
        _id: req.params.commentId,
      });

      const comments = await Comment.find({ post: comment.post }).populate({
        path: 'author',
        ref: 'user',
        select: 'firstName lastName picture',
      });
      return api.success({
        comment,
        comments,
      });
    } catch (error) {
      return api.failure(error, 422);
    }
  },

  delete: async (req, res, next) => {
    if (!req.body) next(new Error('No body found'));
    const api = new Api(res, req);
    try {
      const comment = await Comment.findOneAndDelete({
        _id: req.params.commentId,
      });

      if (!comment) return api.failure(null, 422, 'Post not found');

      const comments = await Comment.find({ post: comment.post }).populate({
        path: 'author',
        ref: 'user',
        select: 'firstName lastName picture',
      });

      await Post.updateOne(
        { _id: comment.post },
        {
          $pull: {
            comments: comment._id,
          },
        },
      );

      return api.success({ comments });
    } catch (error) {
      return api.failure(error, 422);
    }
  },
};
