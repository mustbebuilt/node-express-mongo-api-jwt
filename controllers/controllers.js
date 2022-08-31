// VIEW CONTROLLER

const dbo = require("../db/connection");
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
    console.dir(newFilm);
    dbo
      .getDb()
      .collection("filmsCollection")
      .insertOne(newFilm, function (err, dbResp) {
        if (err) {
          console.error(err);
        }
        if (dbResp.insertedCount === 1) {
          res.json({ msg: "Successfully Added" + dbResp.insertedId });
        } else {
          res.json({ msg: "Not Found" });
        }
      });
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
            res.json({ msg: "Successfully Amended" });
          } else {
            res.json({ msg: "Not Found" });
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
};
