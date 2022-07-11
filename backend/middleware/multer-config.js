const multer = require('multer');
const path = require('path');

const MIME_TYPES = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpg',
	'image/png': 'png',
};

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		if (file.fieldname === 'message_image') cb(null, './images/messages/');
		else if (file.fieldname === 'profil_image') cb(null, './images/profils/');
	},
	filename: (req, file, callback) => {
		const name = file.originalname.split(' ').join('_');
		const extension = MIME_TYPES[file.mimetype];
		callback(null, name + Date.now() + '.' + extension);
	},
});

module.exports = multer({ storage: storage }).single('image');
