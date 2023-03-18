const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema({
    // id

    // body STRING

    // username

    // date created
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

const ThoughtSchema = new Schema({

    // id

    // thoughtText

    // username

    // createdAt

    // reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

// reactionCount, maybe return ThoughtSchema.reactions.length

// Turns the schema into a model
const Thought = model('Thought', ThoughtSchema);

// exports the Thought model
module.exports = Thought;

