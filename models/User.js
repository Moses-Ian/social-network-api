const { Schema, model } = require('mongoose');

// var validateEmail = email => /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email);



const UserSchema = new Schema(
  {
    username: {
      type: String,
			required: 'You need to provide a user name!',
			unique: true,
			trim: true
    },
		email: {
			type: String,
			required: 'You must provide a valid email!',
			unique: true,
			match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please fill a valid email']
		}
    // comments: [
      // {
        // type: Schema.Types.ObjectId,
        // ref: 'Comment'
      // }
    // ]
  },
  {
    toJSON: {
      virtuals: true,
			getters: true
    },
    id: false
  }
);

// get total count of comments and replies on retrieval
UserSchema.virtual('commentCount').get(function() {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;