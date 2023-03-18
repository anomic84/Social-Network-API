const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    // username String

    // email String

    // thoughts array that ref: 'Thought' model

    // friends arrary that ref: 'User' model
},
{
    toJSON: {
        virtuals: true
    },
    id: false
}
);

// turns schema into user model
const User = model('User', UserSchema);

// exports the User model
module.exports = User;