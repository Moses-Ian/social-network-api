const { Schema, model, Types } = require('mongoose');
const { DateTime } = require("luxon");

const ReactionSchema = new Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId()
		},
		reactionBody: {
			type: String,
			required: true,
			maxLength: [280, 'Too long!']
		},
		username: {
			type: String,
			required: true,
			trim: true
		},
		createdAt: {
			type: Date,
			default: DateTime.now(),
			get: createdAtVal => createdAtVal.toLocaleString()
		}
	},
	{
		toJSON: {
			getters: true
		},
		id: false
	}
);

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
    },
		reactions: [ReactionSchema]
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
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;