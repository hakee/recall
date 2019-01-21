const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueness = require('mongoose-unique-validator');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    }]
});

UserSchema.plugin(uniqueness, {
    message: 'is already taken.'
});

UserSchema.pre('save', async function (next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err)
                return next(err);
            bcrypt.hash(user.password, salt, null, (err, hash) => {
                if (err)
                    return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.validatePassword = async function (password) {
    const user = this;

    const compare = await bcrypt.compareSync(password, user.password);
    return compare;
};

UserSchema.set('toJSON', {
    transform: function(doc, ret, opt) {
        delete ret['password']
        return ret;
    }
});

module.exports = mongoose.model('User', UserSchema);