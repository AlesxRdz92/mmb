const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const FacebookTokenStrategy = require('passport-facebook-token');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

//Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({
            'local.email': email
        });
        if(!user)
            return done(null, false);
        /*if(!user.local.confirmation.status) 
            return done(null, false);*/
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
        const existUser = await User.findOne({ 'facebook.id': profile.id });
        if (existUser) 
            return done(null, existUser);
        const newUser = new User({
            name: profile.displayName,
            method: 'facebook',
            facebook: {
                id: profile.id,
                email: profile._json.email
            },
            profileImage: profile.photos[0].value,
            createdAt: new Date().toISOString()
        });
        await newUser.save();
        done(null, newUser);
    }catch(error) {
        done(error, false, error.message);
    }    
}));

//JSON Web Tokens Strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('mmbauth'),
    secretOrKey: process.env.JWTSECRET
}, async (payload, done, a, b) => {
    console.log(payload);
}));