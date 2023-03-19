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

    // getUserById({ params }, res) User.findOne({ _id: params.id})

    // createUser({ body }),res) User.create(body)

    // updateUser({ params, body }, res) User.findOneAndUpdate({ _id: params.id}, body)

    // deleteUser({ params }, res) Thought.deleteMany({ userId. params.id}) THEN User.findOneandDelete({ userId: params.id })

    // addFriend({ params }, res) User.findOneAndUpdate({ _id: params.userId }

    // deleteFriend({ params }, res) User.findOneAndUpdate({ _id: params.userId }
};

module.exports = userController