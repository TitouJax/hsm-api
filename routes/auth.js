const router = require('express').Router();
const validation = require('../validation/requestValidation');
const tokenValidation = require('../validation/tokenValidation');
const db = require('../db/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

router.post('/register', async (req, res) =>
{
    const { error } = validation.registerValidation(req.body);
    if (error) return res.send(error.details[0].message);
    else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const qry = "INSERT INTO user (name, email, password) VALUES ('" + req.body.name + "', '" + req.body.email + "', '" + hashedPassword + "')";
        db.db.query(qry, (err) => {
            if (err) {
                res.send("hsm-api.register failed");
            } else {
                res.send("hsm-api.register: Registering " + req.body.name + " succeeded.");
            }
        })
    }
});

router.post('/login', (req, res) =>
{
    const { error } = validation.loginValidation(req.body);
    if (error) return res.send({"error": "Email or password are wrong"});
    else {
        const qry = "SELECT name, password, email FROM user WHERE email = '" + req.body.email + "'";
        db.db.query(qry, async function (err, result) {
            if (err) throw err;
            if (!result[0]) {
                res.send({"error": "Email or password are wrong"});
            } else {
                const validatePass = await bcrypt.compare(req.body.password, result[0].password);
                if (!validatePass) return res.send({"error": "Email or password are wrong"});
                const token = jwt.sign({email: result[0].email}, process.env.TOKEN);
                res.send({token});
            }
        });
    }
});

router.get('/profile/:name', ((req, res) => {
    var a = JSON.parse("{}");
    db.getBuyOrdersByUser(req.params.name, call => {
        a['buy'] = call;
        db.getSellOrdersByUser(req.params.name, call => {
            a['sell'] = call;
            db.getUserByName(req.params.name, call => {
               a['user'] = call;
               res.send(a);
            });
        })
    });
    })
)

module.exports = router;
