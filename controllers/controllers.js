// VIEW CONTROLLER

const dbo = require("../db/connection");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
var ObjectId = dbo.getObjectId();

module.exports = {
  viewAll: function (req, res) {
    console.info("View All controller");
    dbo
      .getDb()
      .collection("filmsCollection")
      .find({})
      .toArray(function (err, docs) {
        if (err) {
          console.error(err);
        }
        res.json(docs);
      });
  },
  viewItem: function (req, res) {
    console.info("View One controller");
    let filmID = req.params.filmID;
    var o_id = new ObjectId(filmID);
    dbo
      .getDb()
      .collection("filmsCollection")
      .find({ _id: o_id })
      .toArray(function (err, docs) {
        if (err) {
          console.error(err);
        }
        console.dir(docs);
        res.json(docs[0]);
      });
  },
  addItem: function (req, res) {
    console.info("POST controller");
    var newFilm = req.body;
    const isEmpty = Object.keys(newFilm).length === 0;
    if (!isEmpty) {
      console.dir(newFilm);
      dbo
        .getDb()
        .collection("filmsCollection")
        .insertOne(newFilm, function (err, dbResp) {
          if (err) {
            console.error(err);
          }
          if (dbResp.acknowledged === true) {
            //res.json({ msg: "Successfully Added" });
            res.sendStatus(200);
          } else {
            //res.json({ msg: "Not Found" });
            res.sendStatus(403);
          }
        });
    }
  },
  amendItem: function (req, res) {
    console.info("PUT / UPDATE controller");
    var amendFilm = req.body;
    let filmID = amendFilm.filmID;
    var o_id = new ObjectId(filmID);
    console.info(o_id);
    dbo
      .getDb()
      .collection("filmsCollection")
      .updateOne(
        { _id: o_id },
        {
          $set: {
            filmTitle: amendFilm.filmTitle,
            filmCert: amendFilm.filmCert,
          },
        },
        function (err, dbResp) {
          if (err) {
            console.error(err);
          }
          if (dbResp.modifiedCount === 1) {
            // res.json({ msg: "Successfully Amended" });
            res.sendStatus(200);
          } else {
            // res.json({ msg: "Not Found" });
            res.sendStatus(403);
          }
        }
      );
  },
  deleteItem: function (req, res) {
    console.info("DELETE controller");
    let filmID = req.params.filmID;
    let o_id = new ObjectId(filmID);
    dbo
      .getDb()
      .collection("filmsCollection")
      .deleteOne({ _id: o_id }, function (err, dbResp) {
        if (err) {
          console.error(err);
        }
        if (dbResp.deletedCount === 1) {
          res.json({ msg: "Successfully Removed" });
        } else {
          res.json({ msg: "Not Found" });
        }
      });
  },

  checkLogin: function (req, res, username, password) {
    console.info(password);
    dbo
      .getDb()
      .collection("appUsers")
      .find({ name: username })
      .toArray(function (err, docs) {
        console.info(docs);
        if (err) {
          console.error(err);
        }
        if (docs.length > 0) {
          ///////
          console.info(password);
          console.info(docs[0].password);
          bcrypt.compare(password, docs[0].password, function (err, result) {
            if (result == true) {
              let oid = docs[0]._id.toString();
              const user = {
                id: oid,
                username: username,
              };
              console.dir(user);
              jwt.sign({ user: user }, "secretkey", (err, token) => {
                res.status(200).json({
                  message: "Auth granted, welcome!",
                  jwt: token,
                });
              });
              // res.send("/example");
            } else {
              res.sendStatus(403);
            }
          });
        } else {
          res.send("/login");
        }
      });
  },
  authorize: function (req, res) {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
      const bearerToken = bearerHeader.split(" ")[1];
      req.token = bearerToken;
      console.info(req.token);
      jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          return true;
          // res.json({
          //   message: "Welcome",
          // });
        }
      });
    } else {
      return false;
      // res.sendStatus(403);
      // console.info("no");
    }
  },
};
