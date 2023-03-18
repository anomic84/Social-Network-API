const router = require('express').Router();

// turns controllers into usable objects
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
  } = require('../../controllers/user-controller');

// makes a get and post route for all /api/
router
  .route('/')
  .get(getAllUser)
  .post(createUser);

// get, put, and delete routes because these all need the ID to work /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

  // router for creating(adding) a friend onto a user model, by user ID
router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;