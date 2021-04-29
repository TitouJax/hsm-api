const router = require('express').Router();
const db = require('../db/database');
const tokenValidation = require('../validation/tokenValidation');

router.post('/register', (req, res) =>
{
    db.createUser(req.body, callback => {
        if (callback.error) return res.send(callback);
        else return res.send(callback);
    })
});

router.post('/login', (req, res) =>
{
    db.loginUser(req.body, callback => {
        if (callback.error) return res.send(callback);
        else return res.send(callback);
    })
});

router.get('/profile/:name', (req, res) => {
    db.getOrdersByUser(req.params.name, callback => {
        if (callback.error) return res.send(callback);
        else return res.send(callback);
    })
});

router.get('/profile', tokenValidation.auth, (req, res) => {
     res.send(req.user);
});
module.exports = router;
