const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const JWTExtractor = require('passport-jwt').ExtractJwt;

const config = require('../config/app');

const User = require('../models/User');

let strategyOptions = {
    jwtFromRequest: JWTExtractor.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
};

passport.use(new JWTStrategy(strategyOptions, async (payload, done) => {
    try {
        return done(null, payload.user);
    } catch (error) {
        done(error);
    }
}));

passport.use('signUp', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await User.create({
            email,
            password
        });
        return done(null, user);
    } catch (err) {
        done(err);
    }
}));

passport.use('signIn', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {

        const user = await User.findOne({
            email
        });
        if (!user) {

            return done(null, false, {
                message: 'User not found'
            });
        }

        const validate = await user.validatePassword(password);
        if (!validate) {
            return done(null, false, {
                message: 'Wrong Password'
            });
        }


        return done(null, user, {
            message: 'Logged in Successfully'
        });
    } catch (error) {
        return done(error);
    }
}));