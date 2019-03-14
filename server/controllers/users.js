const User = require('../models/user');
require('../db/mongoose');

module.exports = {
    signIn: async (req, res, next) => {
        logger.info(`The user ${req.user} has logged`);
        const token = await req.user.generateAuthToken();
        res.status(200).header('mmbauth', token).json({
        name: req.user.name,
        email: req.user.local.email });
    },
    signUp: async (req, res, next) => {
        const { email, password, name } = req.body;
        const foundUser = await User.findOne({"local.email": email});
        if(foundUser) {
            logger.error(`The email provided is already in use: ${email}`)
            return res.status(400).json('El correo electronico proporcionado ya esta asociado a otra cuenta');
        }
        const newUser = new User({ 
            method: 'local',
            name,
            local: {
                email,
                password
            }
        });
        await newUser.save();
        logger.info(`New user registered with local: ${email}`);
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
        const token = await req.user.generateAuthToken();
        res.status(200).header('mmbauth', token).json({
            name: req.user.name,
            email: req.user.facebook.email });
    },
    logoout: () => {

    }
};