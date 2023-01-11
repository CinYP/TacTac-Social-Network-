const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userid
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userid/friends/:friendid 
router.route('/:userId/friends/:friendid').post(addFriend);

// /api/users/:userid/friends/:friendid 
router.route('/:userId/friends/:friendid').delete(removeFriend);

module.exports = router;