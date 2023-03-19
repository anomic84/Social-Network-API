const { User, Thought } = require('../models');

const thoughtController {

    getAllThought(req, res) {
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
    },


        getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
        // a lot of this is like stated above in the getALLThoughts code
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => {
            // err response specific to not being able to find the thought by its id
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thoughts found with that id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
},

createThought({ body }, res) {
    Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                // push appends spcific value to array, this gives the thought its own id
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
},
updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thoughts found with that id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
},

    // deleteThought({ params }, res) Thought.findOneAndDelete({ _id: params.id })

    // create reaction({ params, body }, res) Thought.findOneAndUpdate({_id: params.thoughtId}}

    // deleteReaction({ params }, res) Thought.findOneAndUpdate({ _id: params.thoughtId })
}

module.exports = thoughtController