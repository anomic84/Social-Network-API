const router = require('express').Router();

// turns controllers into usable objects
const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thought-controller');

// makes a get and post route, 
router
  .route('/')
  .get(getAllThought)
  .post(createThought);

// get, put, and delete routes because these all need the ID to work /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// router for creating a reaction on a thought, by thought ID
router
  .route('/:thoughtId/reactions')
  .post(createReaction);

// router for deleting a reaction on a thought, by thought ID and reaction ID
  router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;
