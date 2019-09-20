module.exports = class Api {
  constructor(res, req) {
    this.res = res;
    this.req = req;
  }

  success(data) {
    return this.res.send(data);
  }

  failure(error, code, message) {
    let response = {};
    if (message) {
      response = {
        error: message,
      };
    } else if (error) {
      if (error.name === 'CastError' || error.name === 'ValidationError') {
        response = {
          error: { [error.path]: 'invalid value' },
        };
      } else if (error.name === 'MongoError') {
        response = {
          error: {
            [error.name]: error.errmsg,
          },
        };
        if (error.errmsg.includes('email')) {
          if (error.errmsg.includes('duplicate')) {
            response = {
              error: { email: 'emailUsed' },
            };
          }
        }
      } else {
        response = {
          error: { unknown: error.message },
        };
      }
    }
    return this.res.status(code).send({
      ...response,
      status: code,
    });
  }
};
