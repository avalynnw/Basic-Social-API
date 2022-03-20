const express = require("express");
const router = express.Router();
const {
    getUsers,
    createUser,
    getSingleUser,
    deleteUser,
    addFriend,
    deleteFriend,
    updateUser,
} =require ('../../controllers/userController')

//  /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:id
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:id/friends/:friendID
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;