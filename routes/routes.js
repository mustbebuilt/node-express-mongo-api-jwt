const express = require("express");

const router = express.Router();

const myControllers = require("../controllers/controllers.js");

router.get("/main", (req, res) => {
  return res.render("main", {
    title: "EJS Example from Parts",
    message: "Hello Template built in parts",
    showMsg: true,
    headingOne: "Page made from parts",
  });
});

router.get("/api/film", (req, res) => {
  myControllers.viewAll(req, res);
});

router.get("/api/film/:filmID", (req, res) => {
  myControllers.viewItem(req, res);
});

router.post("/api/film", (req, res) => {
  myControllers.addItem(req, res);
});

router.put("/api/film/:filmID", (req, res) => {
  myControllers.amendItem(req, res);
});

router.delete("/api/film/:filmID", (req, res) => {
  myControllers.deleteItem(req, res);
});

router.post("/login", (req, res) => {
  console.dir(req.body);
  let username = req.body.user;
  let password = req.body.password;
  myControllers.checkLogin(req, res, username, password);
  //
});

router.get("/auth", (req, res) => {
  myControllers.authorize(req, res);
  //
});

module.exports = router;
