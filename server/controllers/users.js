const User = require('../models/user');
require('../db/mongoose');
const sendEmail = require('../helpers/mail');

module.exports = {
    signIn: async (req, res, next) => {
        logger.info(`The user ${req.user} has logged`);
        const token = await req.user.generateAuthToken();
        res.status(200).header('mmbauth', token).json({
        name: req.user.name,
        email: req.user.local.email,
        profileImage: req.user.profileImage });
    },
    signUp: async (req, res, next) => {
        let photo;
        const { email, password, name } = req.body;
        const foundUser = await User.findOne({"local.email": email});
        if(foundUser) {
            logger.error(`The email provided is already in use: ${email}`)
            return res.status(400).json('El correo electronico proporcionado ya esta asociado a otra cuenta');
        }
        if (/\s/.test(name)) {
          photo = name.split(' ');
        }
        let newUser = new User({ 
            method: 'local',
            name,
            local: {
                email,
                password
            },
            createdAt: new Date().toISOString(),
            profileImage: photo ? `https://ui-avatars.com/api/?name=${photo[0]}+${photo[1]}` : `https://ui-avatars.com/api/?name=${name}`
        });
        newUser = await newUser.save();
        sendEmail({name: newUser.name, token: newUser.local.confirmation.code, email: newUser.local.email}, 'newUser');
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
        if(user) {
            await user.generateReset();
            sendEmail({name: user.name, token: user.local.resetPassword.code, email: user.local.email}, 'forgotPassword');
        }
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
            email: req.user.facebook.email,
            profileImage: req.user.profileImage });
    }
};
