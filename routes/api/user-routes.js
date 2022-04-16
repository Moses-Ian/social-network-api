const router = require('express').Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
	deleteUser
} = require('../../controllers/user-controller');
 
 
 router
	.route('/')
	.get(getAllUser)
	.post(createUser);

router
	.route('/:id')
	.get(getUserById)
	.put(updateUser)
	.delete(deleteUser)

router
	.route('/:id/friends/:friendId')
	.post()
	.delete()
 
module.exports = router;