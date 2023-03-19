const { User, Thought } = require('../models');

const thoughtController {

    getAllThoughts(req, res) {
        Thought.find({})
            // populate lets us fill out a section by referenceing another schema/model
            .populate({
                path: 'reactions',
                // __v is version key, and the - before it excludes it
                select: '-__v'
            })
            .select('-__v')
            // sorts be descending order
            .sort({ _id: -1 })
            // turns data into "dbThoughtData" and turns it into JSON data
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
              });
    }

    //getThoughtById({ params }, res) Thought.findOne({ _id: params.id })

    // createThought({ body }, res) Thought.create(body)

    // updateThought({ params, body }, res) Thought.findOneAndUpdate({ _id: params.id }, body)

    // deleteThought({ params }, res) Thought.findOneAndDelete({ _id: params.id })

    // create reaction({ params, body }, res) Thought.findOneAndUpdate({_id: params.thoughtId}}

    // deleteReaction({ params }, res) Thought.findOneAndUpdate({ _id: params.thoughtId })
}

module.exports = thoughtController