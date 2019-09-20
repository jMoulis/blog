const passport = require('passport');
const PostController = require('../controllers/PostController');

module.exports = app => {
  app.get(
    '/api/v1/posts',

    PostController.findAll,
  );
  app.post(
    '/api/v1/posts',
    passport.authenticate('jwt', { session: false }),
    PostController.create,
  );
  app.get('/api/v1/posts/:postId', PostController.read);
  app.patch(
    '/api/v1/posts/:postId',
    passport.authenticate('jwt', { session: false }),
    PostController.edit,
  );
  app.delete(
    '/api/v1/posts/:postId',
    passport.authenticate('jwt', { session: false }),
    PostController.delete,
  );
};
