const Joi = require('@hapi/joi');

const registerValidation = (body) => {
    const schema = {
        name: Joi.string().min(3).max(16).required(),
        email: Joi.string().min(4).max(100).required().email(),
        password: Joi.string().min(5).max(100).required()
    };
    return Joi.validate(body, schema);
};

const loginValidation = (body) => {
    const schema = {
        email: Joi.string().min(5).max(100).required().email(),
        password: Joi.string().min(5).max(100).required()
    };
    return Joi.validate(body, schema);
};

const createOrderValidation = (body) => {
    const schema = {
        item: Joi.string().min(1).max(255).required(),
        price: Joi.number().integer().positive().required(),
        quantity: Joi.number().integer().positive().required(),
        buyOrSell: Joi.string().valid("buy", "sell").required()
    };
    return Joi.validate(body, schema);
};

const itemUrlValidation = (body) => {
    const schema = {
        item: Joi.string().min(1).max(255).required()
    };
    return Joi.validate(body, schema);
};

const nameUrlValidation = (body) => {
    const schema = {
        name: Joi.string().min(3).max(16).required()
    };
    return Joi.validate(body, schema);
};

const orderIdValidation = (body) => {
    const schema = {
        id: Joi.number().integer().positive().required()
    };
    return Joi.validate(body, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.createOrderValidation = createOrderValidation;
module.exports.itemUrlValidation = itemUrlValidation;
module.exports.orderIdValidation = orderIdValidation;
module.exports.nameUrlValidation = nameUrlValidation;
