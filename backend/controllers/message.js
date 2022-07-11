const Message = require('../models/message');
const fs = require('fs');

exports.createMessages = async (request, response) => {
	try {
		const messageObject = request.body;
		if (request.file !== undefined) {
			const message = new Message({
				...messageObject,
				imageUrl: `${request.protocol}://${request.get('host')}/images/${
					request.file.filename
				}`,
			});
			await message.save();

			response.status(201).json({ message: 'Objet enregistré !' });
		} else {
			const message = new Message({
				...messageObject,
			});
			await message.save();
			response.status(201).json({ message: 'Objet enregistré !' });
		}
	} catch (e) {
		response.status(400).json({ e });
	}
};

exports.getAllMessages = async (request, response) => {
	const message = await Message.find();
	try {
		response.status(200).json(message);
	} catch (e) {
		response.status(404).json({ e });
	}
};
