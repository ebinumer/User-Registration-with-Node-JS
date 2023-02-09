// const { MongoClient, ServerApiVersion } = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

const url = "mongodb+srv://<username>:<password>@cluster0.rivxouo.mongodb.net/test?retryWrites=true&w=majority";

let _db;

module.exports = {
  
  createConnecton : () => {
  MongoClient.connect(url, function(err, db) {
    if (err) console.log(err.message);
    else {
      _db = db.db('test')
      console.log(`DB connection successful`);
    }
  });
},

getDB : () => {
  return _db;
}

};

