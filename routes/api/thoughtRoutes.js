const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtid
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

  // /api/thoughts/:thoughtid/reactions
router
.route('/:thoughtId/reactions')
.post(addReaction);

 // /api/thoughts/:thoughtid/reactions/:reactionid
 router
 .route('/:thoughtId/reactions/:reactionid')
 .delete(removeReaction);



module.exports = router;
