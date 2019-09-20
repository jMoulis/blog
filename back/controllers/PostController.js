const Api = require('../services/Api');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

module.exports = {
  findAll: async (req, res, next) => {
    if (!req.body) next(new Error('No body found'));
    const api = new Api(res, req);
    const { query } = req;
    try {
      const posts = await Post.find({ ...query })
        .populate({
          path: 'author',
          ref: 'user',
          select: 'firstName lastName picture',
        })
        .sort({
          createdAt: 'desc',
        });

      return api.success({
        posts,
      });
    } catch (error) {
      return api.failure(error, 422);
    }
  },

  create: async (req, res, next) => {
    if (!req.body) next(new Error('No body found'));
    const api = new Api(res, req);
    try {
      const newPost = await Post.create({
        ...req.body,
        author: req.user,
      });
      const post = await Post.findOne({ _id: newPost._id }).populate({
        path: 'author',
        ref: 'user',
        select: 'firstName lastName picture',
      });

      return api.success({
        post,
      });
    } catch (error) {
      return api.failure(error, 422);
    }
  },

  read: async (req, res, next) => {
    if (!req.body) next(new Error('No body found'));
    const api = new Api(res, req);
    try {
      const post = await Post.findOne({
        _id: req.params.postId,
      }).populate({
        path: 'author',
        ref: 'user',
        select: 'firstName lastName picture',
      });

      if (!post) return api.failure(null, 404, 'Post not found');
      return api.success({
        post,
      });
    } catch (error) {
      return api.failure(error, 422, 'Error while precessing');
    }
  },

  edit: async (req, res, next) => {
    if (!req.body) next(new Error('No body found'));
    const api = new Api(res, req);
    try {
      await Post.updateOne({ _id: req.params.postId }, { ...req.body });
      const post = await Post.findOne({
        _id: req.params.postId,
      })
        .populate({
          path: 'author',
          ref: 'user',
          select: 'firstName lastName picture',
        })
        .populate({
          path: 'comments',
          ref: 'comment',
          populate: {
            path: 'author',
            ref: 'user',
            select: 'firstName lastName picture',
          },
        });

      return api.success({
        post,
      });
    } catch (error) {
      return api.failure(error, 422);
    }
  },

  delete: async (req, res, next) => {
    if (!req.body) next(new Error('No body found'));
    const api = new Api(res, req);
    try {
      const post = await Post.findOne({
        _id: req.params.postId,
      });
      const deletePost = await Post.deleteOne({
        _id: req.params.postId,
      });
      if (deletePost.deletedCount === 1) {
        await Comment.deleteMany({ post: post._id });
        return api.success({ message: 'deleted' });
      }
    } catch (error) {
      return api.failure(error, 422);
    }
  },
};
