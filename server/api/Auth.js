const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/app');

router.post('/signup', passport.authenticate('signUp', {
    session: false
}), async (req, res, next) => {
    return res.json({
        message: 'Signup successful',
        user: req.user
    });
});

router.post('/signin', async (req, res, next) => {
    passport.authenticate('signIn', async (err, user, info) => {
        try {
            if (err || !user) {
                console.log(err);
                const error = new Error('An Error occured')
                return next(error);
            }
            req.login(user, {
                session: false
            }, async (error) => {
                if (error) return next(error)
                const body = {
                    _id: user._id,
                    email: user.email
                };

                const token = jwt.sign({
                    user: body
                }, config.secret);

                return res.json({
                    token,
                    user: {
                        id: user._id,
                        email: user.email
                    }
                });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

module.exports = router;