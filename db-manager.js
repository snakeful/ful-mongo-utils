class collectionManager {
  constructor (db, coll) {
    this.db = db;
    this.coll = db[coll];
  }
  count (query = {}) {
    return new Promise((resolve, reject) => {
      this.coll.count(query, (err, data) => {
        err ? reject(err) : resolve(data);
      }, reject);
    });
  }
  getAll (query = {}, proj = {}, sort = {}) {
    return new Promise((resolve, reject) => {
      this.coll.find(query, proj).sort(sort, (err, data) => {
        err ? reject(err) : resolve(data);
      }, reject);
    });
  }
  get (query = {}, offset = 0, limit = 100, proj = {}, sort = {}) {
    return new Promise((resolve, reject) => {
      this.coll.find(query, proj).limit(limit).skip(offset).sort(sort, (err, data) => {
        err ? reject(err) : resolve(data);
      }, reject);
    });
  }
  getOne (query = {}, proj) {
    return new Promise((resolve, reject) => {
      this.coll.findOne(query, proj, (err, data) => {
        err ? reject(err) : resolve(data);
      }, reject);
    });
  }
  create (data) {
    return new Promise((resolve, reject) => {
      this.coll.insert(data, (err, data) => {
        err ? reject(err) : resolve(data);
      }, reject);
    });
  }
  update (query) {
    return new Promise((resolve, reject) => {
      this.coll.findAndModify(query, (err, data) => {
        err ? reject(err) : resolve(data);
      }, reject);
    });
  }
  remove (query = {}) {
    return new Promise((resolve, reject) => {
      this.coll.remove(query, (err) => {
        err ? reject(err) : resolve();
      }, reject);
    });
  }
  distinct (fields, query) {
    return new Promise((resolve, reject) => {
      this.coll.distinct(fields, query, (err, data) => {
        err ? reject(err) : resolve(data);
      }, reject);
    });
  }
  aggregates (query, offset = 0, limit = 100) {
    return new Promise((resolve, reject) => {
      this.coll.aggregate(query).limit(limit).skip(offset, (err, data) => {
        err ? reject(err) : resolve(data);
      }, reject);
    });
  }
  initializeOrderedBulkOp () {
    return this.coll.initializeOrderedBulkOp();
  }
  initializeUnorderedBulkOp () {
    return this.coll.initializeUnorderedBulkOp();
  }
};

module.exports = function (db, coll) {
  return new collectionManager(db, coll);
};