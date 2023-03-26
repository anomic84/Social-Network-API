const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
},
    {
        toJSON: {
            // vituals lets us see the count of reactions for thought
            virtuals: true,
            getters: true
        },
        id: false
    }
);

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
},
    {
        toJSON: {
            // virtuals lets us see the count of thoughts for user
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// reactionCount, maybe return ThoughtSchema.reactions.length
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
// Turns the schema into a model
const Thought = model('Thought', ThoughtSchema);

// exports the Thought model
module.exports = Thought;

