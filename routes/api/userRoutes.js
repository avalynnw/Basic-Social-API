const express = require("express");
const router = express.Router();
const {
    getUsers,
    createUser,
    getSingleUser,
    deleteUser,
} =require ('../../controllers/userController')

//  /api/users
router.route('/').get(getUsers).post(createUser);

// TODO: /api/students/:UserId
router.route('/:UserId').get(getSingleUser).delete(deleteUser);


module.exports = router;