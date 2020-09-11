const express = require('express');

const router = express.Router();

const myControllers = require('../controllers/controllers.js');

console.dir(myControllers);

module.exports = (app) => {

    router.get('/main', (req, res) => {
        return res.render('main', {
            title: 'EJS Example from Parts', 
            message: 'Hello Template built in parts',
            showMsg: true,
            headingOne: 'Page made from parts'
            });
    });

    router.get('/allfilms', (req, res) => {
        myControllers.viewAll(app, req, res);
    });

    router.get('/film/:filmID', (req, res) => {
        myControllers.viewItem(app, req, res);
    });

    router.post('/api/film', (req, res) => {
        myControllers.addItem(app, req, res);
    });

    router.put('/api/film', (req, res) => {
        myControllers.amendItem(app, req, res);
    });

    router.delete('/api/film', (req, res) => {
        myControllers.deleteItem(app, req, res);
    });

  
    return router;

}
