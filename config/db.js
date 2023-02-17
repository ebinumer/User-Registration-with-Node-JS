require("dotenv").config()
// const { MongoClient, ServerApiVersion } = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
const password = process.env.DB_CONNECTION_PASS
const userName = process.env.DB_CONNECTION_USERNAME

const url = "mongodb+srv://"+userName+":"+password+"@cluster0.rivxouo.mongodb.net/test?retryWrites=true&w=majority";

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

