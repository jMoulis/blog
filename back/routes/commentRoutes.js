const CommentController = require('../controllers/CommentController');

module.exports = app => {
  app.get('/api/v1/comments', CommentController.findAll);
  app.post('/api/v1/comments', CommentController.create);
  app.get('/api/v1/comments/:commentId', CommentController.read);
  app.put('/api/v1/comments/:commentId', CommentController.edit);
  app.delete('/api/v1/comments/:commentId', CommentController.delete);
};
