const express = require("express");
const router = express.Router();
const {
    getUsers,
    createUser,
    getSingleUser,
    deleteUser,
    addFriend,
    deleteFriend,
} =require ('../../controllers/userController')

//  /api/users
router.route('/').get(getUsers).post(createUser);

// TODO: /api/users/:id
router.route('/:id').get(getSingleUser).delete(deleteUser);



// /api/users/:id/friends/:friendID
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;