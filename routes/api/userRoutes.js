const express = require("express");
const router = express.Router();
const {
    getUsers,
    createUser,
    getSingleUser,
    deleteUser,
    addFriend,
} =require ('../../controllers/userController')

//  /api/users
router.route('/').get(getUsers).post(createUser);

// TODO: /api/users/:id
router.route('/:id').get(getSingleUser).delete(deleteUser);



// TODO: /api/users/:id/friends/:friendID
router.route('/:id/friends/:friendId').post(addFriend);
// router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;