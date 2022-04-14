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
	.delete();

router
	.route('/:id/reactions')
	.post();

router
	.route('/:id/reactions/:reactionId')
	.delete();

module.exports = router;