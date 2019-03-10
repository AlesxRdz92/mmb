const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const FacebookTokenStrategy = require('passport-facebook-token');

//Loca Strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({
            'local.email': email
        });
        if(!user)
            return done(null, false);
        const match = await user.isValidPassword(password);
        if(!match)
            return done(null, false);
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

//Facebook Strategy
passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: process.env.FBAPPID,
    clientSecret: process.env.FBAPPSECRET
}, async(accesToken, refreshToken, profile, done) => {
    try {
        console.log(profile);
        const existUser = await User.findOne({ 'facebook.id': profile.id });
        if (existUser) 
            return done(null, existUser);
        const newUser = new User({
            name: profile.displayName,
            method: 'facebook',
            facebook: {
                id: profile.id,
                email: profile._json.email
            }
        });
        await newUser.save();
        done(null, newUser);
    }catch(error) {
        done(error, false, error.message);
    }    
}));