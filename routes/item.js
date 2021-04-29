const router = require('express').Router();
const db = require('../db/database');

router.get('/:item', (req, res) => {
        db.getItemByName(req.params.item, callback => {
            return res.send(callback);
        })
});

router.get('/', (req, res) => {
        db.getAllItem(callback => {
            return res.send(callback);
        })
})

module.exports = router;
