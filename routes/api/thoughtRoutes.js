const express = require("express");
const router = express.Router();
const {
    getThoughts,
    createThought,
    deleteThought,
    getSingleThought,
    updateThought,
    addReaction,
    deleteReaction,
} =require ('../../controllers/thoughtController')

//  /api/thoughts
router.route('/').get(getThoughts).post(createThought);


// /api/thoughts/:id
router.route('/:id').put(updateThought).get(getSingleThought).delete(deleteThought);

// /api/thoughts/:id/reactions
router.route('/:id/reactions').post(addReaction)


// TODO: /api/thoughts/:id/reactions/:reactionId
router.route('/:id/reactions/:reactionId').delete(deleteReaction)

module.exports = router;