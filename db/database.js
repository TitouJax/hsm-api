const mysql = require('mysql2');
const validation = require("../validation/requestValidation");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/*
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "hsm-api"
});

db.connect((err) => {
    if (err)
    {
        throw  err;
    }
    console.log("Connected to database")
});

function createOrder(body, email, callback) {
    const {error} = validation.createOrderValidation(body)
    if (error) return callback({error: error.details[0].message});
    getItemByName(body.item, cal => {
        if (cal.error) callback(cal);
        else {
            getUserByEmail(email, call => {
                if (call.error) callback(call);
                else {
                    userName = call.name;
                    db.query("INSERT INTO orders(user, item, price, quantity, buyOrSell) VALUES (?, ?, ?, ?, ?)",
                        [userName, body.item, body.price, body.quantity, body.buyOrSell], (err) => {
                            if (err) callback({error: "hsm-api: can't create order"});
                            else callback({success: "hsm-api: order created"});
                        })
                }
            })
        }
    })
}
function getUserByEmail(email, callback) {
    db.query("SELECT name, email creationDate FROM user WHERE email = " + mysql.escape(email), ((err, result) => {
            if (!result[0] || err) callback({error: "hsm-api: user not found"});
            else callback(result[0]);
        }
    ))
}

function getUserByEmailWithPassword(email, callback) {
    db.query("SELECT name, email, password, creationDate FROM user WHERE email = " + mysql.escape(email), ((err, result) => {
            if (!result[0] || err) callback({error: "hsm-api: user not found"});
            else callback(result[0]);
        }
    ))
}

function getUserByName(name, callback) {
    db.query("SELECT name, email, creationDate FROM user WHERE name = " + mysql.escape(name), ((err, result) => {
            if (!result[0] || err) callback({error: "hsm-api: user not found"});
            else callback(result[0]);
        }
    ))
}

function getBuyOrdersByUser(user, callback) {
    db.query("SELECT * FROM orders WHERE buyOrSell = 'buy' AND user = " + mysql.escape(user), (err, result) => {
            if (!result[0] || err) callback({error: "hsm-api: user has no buy orders"})
            else callback(result);
        }
    )
}

function getOrderById(id, callback) {
    db.query("SELECT * FROM orders WHERE id = " + mysql.escape(id), (err, result) => {
        if (!result[0] || err) callback({error: "hsm-api: order not found"})
        else callback(result[0]);
    });
}

function getSellOrdersByUser(user, callback) {
    db.query("SELECT * FROM orders WHERE buyOrSell = 'sell' AND user = " + mysql.escape(user), (err, result) => {
            if (!result[0] || err) callback({error: "hsm-api: user has no sell orders"})
            else callback(result);
        });
}

function loginUser(body, callback) {
    const {error} = validation.loginValidation(body);
    if (error) return callback({error: error.details[0].message});
         getUserByEmailWithPassword(body.email, call => {
            if (call.error) callback({error: "hsm-api: email or password are wrong"});
            else {
                bcrypt.compare(body.password, call.password, (err, res) => {
                    if (!res) return callback({error: "email or password are wrong"});
                    if (res) {
                        const token = jwt.sign({email: call.email}, process.env.TOKEN);
                        callback({token});
                    }
                    else return callback({error: "hsm-api: something went wrong"});
                });
            }
        })
}

async function createUser(body, callback) {
    const {error} = validation.registerValidation(body);
    if (error) return callback({error: error.details[0].message});
    else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);
        db.query("INSERT INTO user(name, email, password) VALUES (?, ?, ?)",
            [body.name, body.email, hashedPassword], (err) => {
                if (err) callback({error: "hsm-api: user already exists"});
                else callback({success: "hsm-api: user " + body.name + " created"});
            })
    }
}

function getOrdersByUser(user, callback) {
    const {error} = validation.nameUrlValidation({name: user});
    if (error) callback({error: error.details[0].message});
    else {
        let a = JSON.parse("{}");
        getBuyOrdersByUser(user, call => {
            a['buy'] = call;
            getSellOrdersByUser(user, cal => {
                a['sell'] = cal;
                getUserByName(user, ca => {
                    a['user'] = ca;
                    callback(a);
                });
            })
        });
    }
}

function getOrdersByItem(item, callback) {
    const callbackResp = JSON.parse("{}");
    db.query("SELECT * FROM orders WHERE buyOrSell = 'buy' AND item = " + mysql.escape(item), (err, result) => {
        if (!result[0] || err) callback({error: "hsm-api: orders not found"})
        else {
            callbackResp['buy'] = result;
            db.query("SELECT * FROM orders WHERE buyOrSell = 'sell' AND item = " + mysql.escape(item), (err, result) => {
                if (!result[0] || err) callback({error: "hsm-api: orders not found"})
                else {
                    callbackResp['sell'] = result;
                    callback(callbackResp);
                }
            });
        }
    });
}

function getItemByName(name, callback) {
    db.query("SELECT * FROM item WHERE name = " + mysql.escape(name), (err, result) => {
        if (!result[0] || err) callback({error: "hsm-api: item not found"});
        else callback(result[0]);
    });
}

function getAllItem(callback) {
    db.query("SELECT * FROM item", (err, result) => {
        if (err) callback({error: "hsm-api: error while fetching items"})
        else callback(result);
    })
}
function deleteOrder(id, callback) {
    db.query("DELETE from ORDERS WHERE id = " + mysql.escape(id), (err) => {
        if (err) callback({error: "hsm-api: order not found"});
        else callback({success: "hsm-api: order " + mysql.escape(id) + " deleted"});
    });
}
function deleteOrderByEmailAndId(email, id, callback) {
    getUserByEmail(email, call => {
        if (call.error) callback(call)
        else {
            user = call.name;
            getOrderById(id, cal => {
                if (cal.error) callback(cal)
                else {
                    if (user == cal.user) {
                        deleteOrder(id, ca => {
                            if (ca.error) callback(ca);
                            else callback(ca);
                        });
                    }
                    else {
                        callback({error: "hsm-api: access denied"})
                    }
                }
            })
        }
    });
}

module.exports.db = db;
module.exports.getUserByName = getUserByName;
module.exports.getBuyOrdersByUser = getBuyOrdersByUser;
module.exports.getSellOrdersByUser = getSellOrdersByUser;
module.exports.deleteOrderByEmailAndId = deleteOrderByEmailAndId;
module.exports.getOrdersByItem = getOrdersByItem;
module.exports.createOrder = createOrder;
module.exports.getItemByName = getItemByName;
module.exports.getAllItem = getAllItem;
module.exports.getOrdersByUser = getOrdersByUser;
module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
*/

