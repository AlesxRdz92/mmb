const JWT = require('jsonwebtoken');
const User = require('../models/user');
require('../db/mongoose');

signToken = user => {
    return token = JWT.sign({
        iss: 'MindMoneyBusiness',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, process.env.JWTSECRET);
}

module.exports = {
    signIn: (req, res, next) => {
        logger.error('Entro');
        const token = signToken(req.user);
        res.status(200).json({ token });
    },
    signUp: async (req, res, next) => {
        const { email, password, name } = req.body;
        const foundUser = await User.findOne({"local.email": email});
        if(foundUser)
            return res.status(400).json('El correo electronico proporcionado ya esta asociado a otra cuenta');
        const newUser = new User({ 
            method: 'local',
            name,
            local: {
                email,
                password
            }
        });
        await newUser.save();
        res.status(200).send();
    },
    confirm: async (req, res, next) => {
        const code = req.params.id;
        const query = {
            'local.confirmation.status': false,
            'local.confirmation.code': code
        }
        const confirm = await User.findOneAndUpdate(query, { $set: {'local.confirmation.status': true} }, { new: true });
        if(!confirm)
            return res.status(404).json('The code does not work');
        res.status(200).send();
    },
    forgotPassword: async (req, res, next) => {
        const user = await User.findOne({'local.email': req.body.email});
        if(user)
            await user.generateReset();
        res.status(200).send();
    },
    changePassword: () => {

    },
    getUserInfo: () => {

    },
    facebookOAuth: async(req, res, next) => {
        const token = signToken(req.user);
        res.status(200).json({ token });
    }
};