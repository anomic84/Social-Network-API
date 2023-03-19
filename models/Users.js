const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // regex
        match: [/.+@.+\..+/]
    },
    thoughts:
        [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
    friends:
        [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
},
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// turns schema into user model
const User = model('User', UserSchema);

// exports the User model
module.exports = User;