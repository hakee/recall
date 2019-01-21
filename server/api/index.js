const router = require('express').Router();
const passport = require('passport');
const authRoutes = require('./Auth');
const userRoutes = require('./User');
const noteRoutes = require('./Note');

router.use('/auth', authRoutes);
router.use('/user', passport.authenticate('jwt', { session : false }), userRoutes);
router.use('/note', passport.authenticate('jwt', {session: false}), noteRoutes);
// TODO: Add error handler
// router.use((error, req, res, next) => {
//     if (error.name )
// });

module.exports = router;