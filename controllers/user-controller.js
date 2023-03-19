const { User, Thought } = require('../models');

const userController = {

    getAllUser(req, res) {
        User.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            // populates user's thoughts into JSON
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            //   populates user's friends into JSON
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    deleteUser({ params }, res) {
        // deletes all of users thoughts/reactions and other data first
        Thought.deleteMany({ userId: params.id })
            .then(() => {
                // deletes user
                User.findOneAndDelete({ userId: params.id })
                    .then(dbUserData => {
                        if (!dbUserData) {
                            res.status(404).json({ message: 'No User found with this id!' });
                            return;
                        }
                        res.json(dbUserData);
                    });
            })
            .catch(err => res.json(err));
    },
    // addFriend({ params }, res) User.findOneAndUpdate({ _id: params.userId }

    // deleteFriend({ params }, res) User.findOneAndUpdate({ _id: params.userId }
};

module.exports = userController