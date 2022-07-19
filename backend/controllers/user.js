const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

exports.signup = (req, res, next) => {
	console.log(req.body);
	bcrypt
		.hash(req.body.password, parseInt(process.env.SALT))
		.then((hash) => {
			const user = new User({
				email: req.body.email,
				password: hash,
				username: req.body.username,
			});
			user
				.save()
				.then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
	User.findOne({ email: req.body.email })
		.then((user) => {
			if (!user) {
				return res.status(401).json({ error: 'Utilisateur non trouvé !' });
				console.log('Erreur n1');
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({ error: 'Mot de passe incorrect !' });
						console.log('Erreur n2');
					}
					res.status(200).json({
						userId: user._id,
						token: jwt.sign(
							{ userId: user._id },
							`${process.env.TOKEN_SECRET}`,
							{
								expiresIn: '12h',
							}
						),
						isAdmin: user.isAdmin,
					});
				})
				.catch((error) => {
					console.log('testemail');
					res.status(500).json({ error });
				});
		})
		.catch((error) => {
			console.log('testerror');
			res.status(500).json({ error });
		});
};
