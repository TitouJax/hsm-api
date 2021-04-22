const router = require('express').Router();
const tokenValidation = require('../validation/tokenValidation');
const db = require("../db/database");

router.post('/create', tokenValidation.auth, (req, res) => {
    db.db.getConnection(function(err, connection) {
        if (err) {
            callback({error: err});
            return;
        }
        db.createOrder(req.body, req.user.email, callback => {
            res.send(callback);
        });
    })
})

router.delete('/delete', tokenValidation.auth, (req, res) => {
    db.db.getConnection(function(err, connection) {
        if (err) {
            callback({error: err});
            return;
        }
        db.deleteOrderByEmailAndId(req.user.email, req.body.id, call => {
            res.send(call);
        });
    })
})

router.get('/:item', (req, res) => {
        db.getOrdersByItem(req.params.item, callback => {
            res.send(callback);
        });
})

module.exports = router;
