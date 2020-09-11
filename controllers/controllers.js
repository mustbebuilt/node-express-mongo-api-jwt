// VIEW CONTROLLER


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
        let filmID = parseInt(req.params.filmID);
        app.set('myDb').collection('filmsCollection').find({"filmID": filmID}).toArray(function(err, docs) {
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
        // Sort as filmID as INT
        var filmIDAsInt = parseInt(newFilm.filmID);
        newFilm.filmID = filmIDAsInt;
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
        // Sort as filmID as INT
        let filmIDAsInt = parseInt(amendFilm.filmID);
        console.info(filmIDAsInt);
        amendFilm.filmID = filmIDAsInt;
        app.get('myDb').collection("filmsCollection").updateOne(
            { "filmID": amendFilm.filmID },
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
        var filmIDAsInt = parseInt(removeFilm.filmID);
        removeFilm.filmID = filmIDAsInt;
        app.get('myDb').collection("filmsCollection").deleteOne(
            { "filmID": removeFilm.filmID },
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
