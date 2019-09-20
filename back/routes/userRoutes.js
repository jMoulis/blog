const passport = require('passport');
const UserController = require('../controllers/UserController');

module.exports = app => {
  app.patch(
    '/api/v1/users/:userId',
    passport.authenticate('jwt', { session: false }),
    UserController.editUser,
  );
  app.patch(
    '/api/v1/users/delete/:userId',
    passport.authenticate('jwt', { session: false }),
    UserController.deleteUser,
  );
};
