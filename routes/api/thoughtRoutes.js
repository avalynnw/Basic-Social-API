const express = require("express");
const router = express.Router();
const {
    getThoughts,
    createThought,
} =require ('../../controllers/thoughtController')

//  /api/users
router.route('/').get(getThoughts).post(createThought);

module.exports = router;