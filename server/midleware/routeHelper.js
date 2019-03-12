const joi = require('joi');

module.exports = {
    validateBody: schema => {
        return(req, res, next) => {
            const result = joi.validate(req.body, schema);
            if(result.error){
                logger.error(`Malformed body ${req.body}`);
                return res.status(400).json(result.error);
            } else {
                next();
            }
        }

    },
    schemas: {
        signUpSchema: joi.object().keys({
            email: joi.string().email().required(),
            password: joi.string().required(),
            name: joi.string().required()
        }),
        signInSchema: joi.object().keys({
            email: joi.string().email().required(),
            password: joi.string().required(),
        })
    }
}