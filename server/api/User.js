const router = require('express').Router();
const User = require('../models/User');

router.get('/profile', async (req, res, next) => {
    const { _id } = req.user;
    const user = await User.findOne({_id}).select('-notes');
    res.json(user);
});

module.exports = router;