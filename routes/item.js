const router = require('express').Router();
const db = require('../db/database');

router.get('/:item', (req, res) => {
    db.db.getConnection(function(err, connection) {
        if (err) {
            callback({error: err});
            return;
        }
        db.getItemByName(req.params.item, callback => {
            if (callback.error) return res.send(callback);
            else return res.send(callback);
        })
    })
});

router.get('/', (req, res) => {
    db.db.getConnection(function(err, connection) {
        if (err) {
            callback({error: err});
            return;
        }
        db.getAllItem(callback => {
            if (callback.error) return res.send(callback);
            else return res.send(callback);
        })
    })
})

module.exports = router;
