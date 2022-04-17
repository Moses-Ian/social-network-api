const { User, Thought } = require('../models');

const userController = {
	// get all users
	getAllUser(req, res) {
		User.find({})
			.select('-__v -thoughts')
			.sort({ _id: -1 })
			.then(dbUserData => res.json(dbUserData))
			.catch(err => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// get one user by id
	getUserById({ params }, res) {
		User.findOne({ _id: params.id })
			.populate({
				path: 'thoughts',
				select: '-__v'
			})
			.select('-__v')
			.then(dbUserData => {
				if (!dbUserData) {
					res.status(404).json({ message: 'No user found with this id!' });
					return;
				}
				res.json(dbUserData);
			})
			.catch(err => {
				console.log(err);
				res.status(400).json(err);
			});
	},
		
	// createUser
	createUser({ body }, res) {
		User.create(body)
			.then(dbUserData => res.json(dbUserData))
			.catch(err => res.status(400).json(err));
	},

	// update user by id
	updateUser({ params, body }, res) {
		User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
			.then(dbUserData => {
				if (!dbUserData) {
					res.status(404).json({ message: 'No user found with this id!' });
					return;
				}
				res.json(dbUserData);
			})
			.catch(err => res.status(400).json(err));
	},	

	// delete user
	deleteUser({ params }, res) {
		User.findOneAndDelete({ _id: params.id })
		// User.findOne({ _id: params.id })
			.then(dbUserData => {
				if (!dbUserData) {
					res.status(404).json({ message: 'No user found with this id!' });
					return;
				}
				// delete associated thoughts
				//step 1: get list of ids
				//step 2: map each id to a promise
				//step 3: execute each promise
				return Promise.all(dbUserData.thoughts.map(thought => Thought.findOneAndDelete({ _id: thought.toString() })));
			})
			.then(values => res.status(200).json({ message: 'success' }))
			.catch(err => res.status(400).json(err));
	},
	
	//add friend
	addFriend({ params }, res) {
		Promise.all([
			User.findOneAndUpdate(
				{ _id: params.id },
				{ $push: { friends: params.friendId } },
				{ new: true, runValidators: true }
			),
			User.findOneAndUpdate(
				{ _id: params.friendId },
				{ $push: { friends: params.id } },
				{ new: true, runValidators: true }
			)
		])
			.then(([dbUserData, dbFriendData]) => {
				if( !dbUserData || !dbFriendData ) {
					res.status(404).json({ message: 'No user found with this id!' });
					return;
				}
				res.json(dbUserData);
			})
			.catch(err => res.status(400).json(err));
	},

	//remove friend
	removeFriend({ params }, res) {
		Promise.all([
			User.findOneAndUpdate(
				{ _id: params.id },
				{ $pull: { friends: params.friendId } },
				{ new: true, runValidators: true }
			),
			User.findOneAndUpdate(
				{ _id: params.friendId },
				{ $pull: { friends: params.id } },
				{ new: true, runValidators: true }
			)
		])
			.then(([dbUserData, dbFriendData]) => {
				if( !dbUserData || !dbFriendData ) {
					res.status(404).json({ message: 'No user found with this id!' });
					return;
				}
				res.json(dbUserData);
			})
			.catch(err => res.status(400).json(err));
	}
};






































module.exports = userController;