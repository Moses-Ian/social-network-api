const router = require('express').Router();
/* const {
  addComment,
  removeComment,
  addReply,
  removeReply
} = require('../../controllers/comment-controller');
 */
 
 router
	.route('/')
	.get()
	.post();

router
	.route('/:id')
	.get()
	.put()
	.delete()

router
	.route('/:id/friends/:friendId')
	.post()
	.delete()
 
module.exports = router;