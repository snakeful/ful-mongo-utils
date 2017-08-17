const dbManager = require('./db-manager');
module.exports = function (obj) {
  const mongojs = require('mongojs');
  obj.Id = mongojs.ObjectId;
  return function (url, collections, options = {}) {
    const db = mongojs(url, collections, options);
    collections.forEach((coll) => {
      obj[coll] = dbManager(db, coll);
    });
    obj.log = function (err) {
      let log = '';
      if (err instanceof Object) {
        if (err.message) {
          log += `err.message\n`;
        } else {
          log += `${JSON.stringify(err)}\n`;
        }
        if (err.stack) {
          log += `err.stack\n`;
        }
      }
    };
    obj.throw = function (err, res) {
      if (!res.headersSent) {
        res.status(err.status || 500).json(err instanceof Object ? {
          error: err.error || err.message || JSON.stringify(err)
        } : {
          error: err
        });
      }
      if (err instanceof Object) {
        err.date = new Date().toISOString();
      }
      this.log(err);
    };
    obj.error = function (error, status, data) {
      error = error instanceof Object ? error : {
        status: status || 500,
        error: error
      };
      for (let prop in data) {
        if (data.hasOwnProperty(prop)) {
          error[prop] = data[prop];
        }
      }
      return error;
    };
    return db;
  };
};
