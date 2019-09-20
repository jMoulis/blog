const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const DBHelpers = require('./DBHelpers');
const User = require('../models/User');
const keys = require('../config/keys');

const { ExtractJwt, Strategy: JWTStrategy } = passportJWT;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id, { password: 0 });
    done(null, { user: { ...user._doc, fullName: user.fullName } });
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  'local-signin',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (!existingUser) return done(null, false);
        if (!existingUser.password) {
          return done(null, false);
        }
        const isValidPassword = bcrypt.compareSync(
          password,
          existingUser.password,
        );

        if (!isValidPassword) return done(null, false);
        const useWithoutPassword = await User.findOne(
          { _id: existingUser._id },
          { password: 0 },
        );
        return done(null, useWithoutPassword);
      } catch (error) {
        console.error('local Error', error.message);
        done(null, false, { error: error.message });
      }
    },
  ),
);

passport.use(
  'local-signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const dbHelpers = new DBHelpers(User);
      try {
        const user = await User.findOne(
          { email: email.toLowerCase() },
          { password: 0 },
        );

        if (user) {
          let errorMessage = 'emailUsed';
          if (user.provider) {
            (errorMessage = 'emailUsedProvider'),
              {
                provider: user.provider,
              };
          }
          return done({ email: errorMessage }, false);
        }

        const hashPassword = bcrypt.hashSync(password.trim(), 10);

        const newUser = await dbHelpers.createAndFindOne(
          {
            ...req.body,
            password: hashPassword,
          },
          { password: 0 },
        );

        return done(null, newUser);
      } catch (error) {
        console.error('local Error', error.message);
        done(error.message, false, { error: error.message });
      }
    },
  ),
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: keys.jwtSecret,
    },
    async ({ user }, done) => {
      try {
        const existingUser = await User.findOne({ _id: user }, { password: 0 });
        if (existingUser) return done(null, existingUser);
        return done(null, false);
      } catch (error) {
        console.error('Jwt Error', error.message);
        done(null, false, { error: error.message });
      }
    },
  ),
);
