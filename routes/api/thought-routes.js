const router = require('express').Router();
const {
	getAllThought,
	getThoughtById,
  createThought,
  updateThought,
	deleteThought
} = require('../../controllers/thought-controller');

 

router
	.route('/')
	.get(getAllThought)
	.post(createThought);
	
router
	.route('/:id')
	.get(getThoughtById)
	.put(updateThought)
	.delete(deleteThought);

router
	.route('/:id/reactions')
	.post();

router
	.route('/:id/reactions/:reactionId')
	.delete();

module.exports = router;