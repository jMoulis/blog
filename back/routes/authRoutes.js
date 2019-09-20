const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = app => {
  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.post('/auth/signin', function signin(req, res, next) {
    passport.authenticate('local-signin', { session: false }, (error, user) => {
      if (error) return res.status(422).send({ error });
      if (!user)
        return res.status(403).send({
          error: {
            password: 'loginFailed',
          },
        });
      req.login(user, { session: false }, err => {
        if (err) {
          return res.status(422).send({ error: err.message });
        }
        const token = jwt.sign({ user }, keys.jwtSecret);
        return res.status(200).send({
          user: { ...user._doc, fullName: user.fullName },
          token,
        });
      });
    })(req, res, next);
  });

  app.post('/auth/signup', function signin(req, res, next) {
    const { email, password } = req.body;
    let error = null;
    if (!email) {
      error = {
        email: 'emailMandatory',
      };
    }
    if (!password) {
      error = {
        ...error,
        password: 'passwordMandatory',
      };
    }
    if (error) {
      return res.status(422).send({ error });
    }

    return passport.authenticate(
      'local-signup',
      { session: false },
      (err, user) => {
        if (err) return res.status(422).send({ error: err });
        const token = jwt.sign({ user }, keys.jwtSecret);
        return res.status(200).send({
          user: { ...user._doc, fullName: user.fullName },
          token,
        });
      },
    )(req, res, next);
  });

  app.get('/auth/logged_user', function fetchLoggedUser(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err) return res.status(422).send({ error: err });
      if (!user) return res.status(404).send({ error: 'userNotFound' });
      res.send({ user: { ...user._doc, fullName: user.fullName } });
    })(req, res, next);
  });
};
