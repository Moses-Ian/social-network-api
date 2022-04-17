const { User, Thought } = require('../models');

const thoughtController = {
	// get all thoughts
	getAllThought(req, res) {
		Thought.find({})
			.select('-__v')
			.sort({ _id: -1 })
			.then(dbThoughtData => res.json(dbThoughtData))
			.catch(err => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// get one thought by id
	getThoughtById({ params }, res) {
		Thought.findOne({ _id: params.id })
			.select('-__v')
			.then(dbThoughtData => {
				if (!dbThoughtData) {
					res.status(404).json({ message: 'No thought found with this id!' });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch(err => {
				console.log(err);
				res.status(400).json(err);
			});
	},
		
	// createThought
	createThought({ body }, res) {
		Thought.create(body)
			.then(({ _id }) => {
				return User.findOneAndUpdate(
					{ _id: body.userId },
					{ $push: { thoughts: _id } },
					{ new: true, runValidators: true }
				);
			})
			.then(dbUserData => {
				if (!dbUserData) {
					res.status(404).json({ message: 'No user found with this id!' });
					return;
				}
				res.json(dbUserData);
			})
			.catch(err => res.status(400).json(err));
	},

	// update thought by id
	updateThought({ params, body }, res) {
		Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
			.then(dbThoughtData => {
				if (!dbThoughtData) {
					res.status(404).json({ message: 'No thought found with this id!' });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch(err => res.status(400).json(err));
	},	

	// delete thought
	deleteThought({ params }, res) {
		Thought.findOneAndDelete({ _id: params.id })
			.then(dbThoughtData => {
				if (!dbThoughtData) {
					res.status(404).json({ message: 'No thought found with this id!' });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch(err => res.status(400).json(err));
	},
	
	// add reaction
	addReaction({ params, body }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.id },
			{ $push: { reactions: body } },
			{new: true, runValidators: true}
		)
			.then(dbThoughtData => {
				if (!dbThoughtData) {
					res.status(404).json({ message: 'No thought found with this id!' });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch(err => res.status(400).json(err));
	},
	
	// remove reaction
	removeReaction({ params }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.id },
			{ $pull: { reactions: { reactionId: params.reactionId } } },
			{new: true}
		)
			.then(dbThoughtData => res.json(dbThoughtData))
			.catch(err => res.json(err));
	}
};
















































module.exports = thoughtController;