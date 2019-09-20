const bcrypt = require('bcrypt');
const User = require('../models/User');
const Api = require('../services/Api');

module.exports = {
  editUser: async (req, res, next) => {
    if (!req.body) next(new Error('No body found'));
    const api = new Api(res, req);
    try {
      const { oldPassword, password } = req.body;
      const user = await User.findOne({ _id: req.params.userId });
      if (!user) return res.status(404).send({ error: req.t('userNotFound') });
      let values = {
        ...req.body,
      };

      if (password) {
        if (oldPassword) {
          const isValidPassword = bcrypt.compareSync(
            oldPassword,
            user.password,
          );
          if (isValidPassword) {
            values = {
              ...values,
              password: bcrypt.hashSync(password.trim(), 10),
            };
          } else {
            return res.status(404).send({
              error: { oldPassword: req.t('messagePwd.invalidPassword') },
            });
          }
        } else {
          values = {
            ...values,
            password: bcrypt.hashSync(password.trim(), 10),
          };
        }
      }
      if (req.file) {
        values = {
          ...values,
          photo: {
            name: req.file.filename,
            url: req.file.path,
          },
        };
      }
      await User.updateOne(
        { _id: req.params.userId },
        {
          ...values,
        },
      );
      const userUpdated = await User.findOne(
        { _id: req.params.userId },
        { password: 0 },
      );
      return api.success({
        user: { ...userUpdated._doc, fullName: userUpdated.fullName },
      });
    } catch (error) {
      return api.failure(error, 422);
    }
  },
  deleteUser: async (req, res) => {
    const api = new Api(res, req);
    try {
      const { password } = req.body;
      const user = await User.findOne({ _id: req.params.userId });
      if (!user) return res.status(404).send({ error: req.t('userNotFound') });

      if (user.provider) {
        await User.deleteOne({ _id: req.params.userId });
        return api.success({ message: 'deleted' });
      }

      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword)
        return res.status(404).send({
          error: { password: req.t('messagePwd.invalidPassword') },
        });

      await User.deleteOne({ _id: req.params.userId });

      return api.success({ message: 'deleted' });
    } catch (error) {
      console.log(error);
      return api.failure(error, 422);
    }
  },
};
