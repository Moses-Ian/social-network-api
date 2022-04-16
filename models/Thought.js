const { Schema, model } = require('mongoose');
const { DateTime } = require("luxon");

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
			required: 'You need to provide some text!',
			minLength: [1, 'Too short!'],
			maxLength: [280, 'Too long~\!'],
			trim: true
    },
    createdAt: {
      type: Date,
      default: DateTime.now(),
		  get: createdAtVal => createdAtVal.toLocaleString()
    },
		username: {
      type: String,
			required: true,
			trim: true
    }
		// reactions: [
      // {
        // type: Schema.Types.ObjectId,
        // ref: 'Reaction'
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

// get total count of reactions and replies on retrieval
// ThoughtSchema.virtual('reactionCount').get(function() {
  // return this.reactions.reduce((total, reaction) => total + reaction.replies.length + 1, 0);
// });

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;