import axios from 'axios';
import store from '@/store/index.js';

export async function login(email, password) {
	return await axios.post('http://localhost:4200/api/auth/login', {
		email: email,
		password: password,
	});
}

export async function signUp(data) {
	return await axios.post('http://localhost:4200/api/auth/signup', data, {
		data: data,
	});
}

export async function modifyMessage(postId, data) {
	return await axios.put('http://localhost:4200/api/messages/' + postId, data, {
		headers: {
			Authorization: 'Bearer ' + store.getters.user.token,
		},
	});
}

export async function getOneMessage(postId) {
	return await axios.get('http://localhost:4200/api/messages/' + postId, {
		headers: {
			Authorization: 'Bearer ' + store.getters.user.token,
		},
	});
}

export async function getAllMessages() {
	return await axios.get('http://localhost:4200/api/messages', {
		headers: {
			Authorization: 'Bearer ' + store.getters.user.token,
		},
	});
}

export async function deleteMessage(postId, isAdmin) {
	return await axios.delete('http://localhost:4200/api/messages/' + postId, {
		headers: {
			Authorization: 'Bearer ' + store.getters.user.token,
		},
		data: {
			postId: postId,
			isAdmin: isAdmin,
		},
	});
}

export async function sendLike(postId, userId) {
	return await axios.post(
		'http://localhost:4200/api/messages/' + postId + '/like',
		{
			userId: userId,
		},
		{
			headers: {
				Authorization: 'Bearer ' + store.getters.user.token,
			},
		}
	);
}

export async function postMessage(data) {
	return await axios.post('http://localhost:4200/api/messages', data, {
		headers: {
			Authorization: 'Bearer ' + store.getters.user.token,
		},
	});
}
