const express = require("express");
const router = express.Router();
const {
    getThoughts,
    createThought,
    deleteThought,
    getSingleThought,
    updateThought,
    addReaction,
} =require ('../../controllers/thoughtController')

//  /api/thoughts
router.route('/').get(getThoughts).post(createThought);


// /api/thoughts/:id
router.route('/:id').put(updateThought).get(getSingleThought).delete(deleteThought);

// TODO: /api/thoughts/:id/reactions
router.route('/:id/reactions').post(addReaction)

module.exports = router;