const express = require("express");
const router = express.Router();
const {
    getThoughts,
    createThought,
    deleteThought,
    getSingleThought,
} =require ('../../controllers/thoughtController')

//  /api/thoughts
router.route('/').get(getThoughts).post(createThought);


// TODO: /api/thoughts/:id
router.route('/:id').get(getSingleThought).delete(deleteThought);



module.exports = router;