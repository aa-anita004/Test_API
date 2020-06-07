var express = require('express');
var mongoClient = require('mongodb').MongoClient;
var router = express.Router();

const dbName = "Crud_Test";
const dbUrl = "mongodb://localhost:27017";
const ObjectID = require('mongodb').ObjectID;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/post', function(req, res, next) {
  res.send('post api user'+ JSON.stringify(req.body));
});

router.get("/UserList", function (req, res, next) {
  mongoClient.connect(dbUrl, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo.collection("Person").find({}).toArray(function (err, result) {
      if (err) throw err;
       console.log(result);
      res.send(result);
      db.close();
    });
  }); 
});

router.post("/addPerson", function (req, res, next) {
  mongoClient.connect(dbUrl, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    let userInfo = {
      username: req.body.username,
      email: req.body.email,
      age: req.body.age,
    };
    dbo.collection("Person").insertOne(userInfo, function(err, data) {
      if (err){
        res.end(err.message);
      }else {
        res.end(JSON.stringify(userInfo)); 
      }
      db.close();
    });
  });
}); 

module.exports = router;
