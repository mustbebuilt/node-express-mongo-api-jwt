// VIEW CONTROLLER

var ObjectId = require('mongodb').ObjectId; 

module.exports = {
    viewAll: function (app, req, res) {
        console.info("View All controller")
        app.set('myDb').collection('filmsCollection').find({}).toArray(function (err, docs) {
            if (err) {
                console.error(err)
            }
            res.json(docs)
        })
    },
    viewItem: function (app, req, res) {
        console.info("View One controller")
        let filmID = req.params.filmID;
        var o_id = new ObjectId(filmID);
        app.set('myDb').collection('filmsCollection').find({"_id": o_id}).toArray(function(err, docs) {
            if (err) {
                console.error(err)
            }
            console.dir(docs);
            return res.render('oneFilm', {
                title : "Some Title",
                film: docs[0]
                });
        })
    },
    addItem: function (app, req, res) {
        console.info("POST controller")
        var newFilm = req.body;
        console.dir(newFilm);
        app.get('myDb').collection("filmsCollection").insertOne(newFilm,
            function (err, dbResp) {
                if (err) {
                    console.error(err)
                }
                if (dbResp.insertedCount === 1) {
                    res.json({ msg: "Successfully Added" + dbResp.insertedId })

                } else {
                    res.json({ msg: "Not Found" })
                }
            })
    },
    amendItem: function (app, req, res) {
        console.info("PUT / UPDATE controller")
        var amendFilm = req.body;
        let filmID = amendFilm.filmID;
        var o_id = new ObjectId(filmID);
        console.info(o_id);
        app.get('myDb').collection("filmsCollection").updateOne(
            { _id: o_id },
            { $set: { "filmName": amendFilm.filmName, "filmCert": amendFilm.filmCert } },
            function (err, dbResp) {
                if (err) {
                    console.error(err)
                }
                if (dbResp.modifiedCount === 1) {
                    res.json({ msg: "Successfully Amended" })
                } else {
                    res.json({ msg: "Not Found" })
                }
            })
    },
    deleteItem: function (app, req, res) {
        console.info("DELETE controller")
        var removeFilm = req.body;
        console.dir(removeFilm);
        var o_id = new ObjectId(removeFilm.filmID);
        app.get('myDb').collection("filmsCollection").deleteOne(
            { _id: o_id },
            function (err, dbResp) {
                if (err) {
                    console.error(err)
                }
                if (dbResp.deletedCount === 1) {
                    res.json({ msg: "Successfully Removed" })
                } else {
                    res.json({ msg: "Not Found" })
                }
            })
    },
}
