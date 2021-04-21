const router = require('express').Router();
const validation = require('../validation/requestValidation');
const db = require('../db/database');

router.post('/register', (req, res) =>
{
    db.db.getConnection(function(err, connection) {
        if (err) {
            callback({error: err});
            return;
        }
        db.createUser(req.body, callback => {
            if (callback.error) return res.send(callback);
            else return res.send(callback);
        })
    })
});

router.post('/login', (req, res) =>
{
    db.db.getConnection(function(err, connection) {
        if (err) {
            callback({error: err});
            return;
        }
        db.loginUser(req.body, callback => {
            if (callback.error) return res.send(callback);
            else return res.send(callback);
        })
    })
});

router.get('/profile/:name', (req, res) => {
    db.db.getConnection(function(err, connection) {
        if (err) {
            callback({error: err});
            return;
        }
        db.getOrdersByUser(req.params.name, callback => {
            if (callback.error) return res.send(callback);
            else return res.send(callback);
        })
    })
});

module.exports = router;
