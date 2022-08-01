const Message = require('../models/message');
const fs = require('fs');
const { request } = require('http');

exports.createMessage = async (request, response) => {
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

exports.getOneMessage = async (request, response) => {
	const message = await Message.findOne({ _id: request.params.id });
	try {
		response.status(200).json(message);
	} catch (e) {
		response.status(404).json({ e });
	}
};

exports.modifyMessage = async (request, response) => {
	const message = await Message.findOne({ _id: request.params.id });
	try {
		if (
			request.auth.userId !== message.userId &&
			request.body.isAdmin === false
		) {
			return response.status(401).json({ message: 'Requete non autorisée' });
		}

		console.log('Request body');
		console.log({ ...request.body, _id: request.params.id });
		const newMessage = {
			...request.body,
			_id: request.params.id,
			imageUrl: message.imageUrl,
		};
		if (request.file !== undefined) {
			if (message.imageUrl !== undefined) {
				const filename = message.imageUrl.split('/images/')[1];
				fs.unlink(`images/${filename}`, () => {});
			}
			const imageUrl = `${request.protocol}://${request.get('host')}/images/${
				request.file.filename
			}`;
			newMessage.imageUrl = imageUrl;
			console.log('Pas de modification');
		}
		console.log(newMessage);
		await Message.updateOne({ _id: request.params.id }, newMessage);
		response.status(200).json({ message: 'Objet modifié' });
	} catch (e) {
		console.log(e);
		response.status(500).json({ e });
	}
};

exports.deleteMessage = async (request, response) => {
	const message = await Message.findOne({ _id: request.body.postId });
	try {
		if (
			request.auth.userId !== message.userId &&
			request.body.isAdmin === false
		) {
			return response.status(401).json({ message: 'Requete non autorisée' });
		}
		if (message.imageUrl !== undefined) {
			const filename = message.imageUrl.split('/images/')[1];
			fs.unlink(`images/${filename}`, () => {});
		}

		await Message.deleteOne({ _id: request.body.postId });

		response.status(200).json({ message: 'Objet supprimé' });
	} catch (e) {
		response.status(500).json({ e });
	}
};

exports.like = async (request, response) => {
	try {
		const message = await Message.findOne({ _id: request.params.id });
		const liked = message.usersLiked.includes(request.body.userId);
		if (liked) {
			message.likes--;
			message.usersLiked = message.usersLiked.filter(
				(user) => user !== request.body.userId
			);
		} else {
			message.likes++;
			message.usersLiked.push(request.body.userId);
		}

		await Message.updateOne({ _id: request.params.id }, message);

		response.status(200).json({ message });
	} catch (e) {
		response.status(400).send('[Error]: ' + e);
	}
};
