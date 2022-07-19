const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
	userId: { type: String, required: true },
	username: { type: String, required: true },
	title: { type: String, required: true },
	description: { type: String, required: true },
	date: { type: String, required: true },
	//modifyDate: { type: [Date], required: true },
	//numberOfChange: { type: Number, required: true, default: 0 },
	imageUrl: { type: String },
	likes: { type: Number, required: true, default: 0 },
	//dislikes: { type: Number, required: true, default: 0 },
	usersLiked: { type: [String], required: true, default: [] },
	//usersDisliked: { type: [String], required: true, default: [] },
	/*comments: {
		type: [
			{
				commenterId: String,
				commenterPseudo: String,
				text: String,
				timestamp: Number,
			},
		],
		required: true,
	},*/
});

module.exports = mongoose.model('Message', messageSchema);
