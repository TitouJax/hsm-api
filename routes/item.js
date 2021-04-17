const router = require('express').Router();
const db = require('../db/database');
const validation = require("../validation/requestValidation");

router.get('/:item', (req, res) => {
    const { error } = validation.itemUrlValidation(JSON.parse('{"item": "' + req.params.item + '"}'));
    if (error) return res.send(error.details[0].message);
    const qryItem = "SELECT * FROM item WHERE name = " + "'"  + req.params.item + "'";
    db.db.query(qryItem, async function (err, result) {
        if (err) return res.send("hsm-api.item: something went wrong");
        else {
            if (result.length == 0) return res.send({error: "hsm-api.item: item not found"});
            else res.send({item: result[0]});
        }
    });
});

router.get('/', (req, res) => {
    const qryItems = "Select * FROM item"
    db.db.query(qryItems, (err, result) => {
        if (err) return res.send("hsm-api.items: something went wrong");
        else {
            return res.send(result);
        }
    })
})

module.exports = router;
