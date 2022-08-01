<template>
	<div class="col">
		<div class="card h-100">
			<div class="card-link" @click="getOneMessage">
				<img
					v-if="post.imageUrl !== undefined"
					class="card-img-top"
					:src="post.imageUrl"
					:alt="post.title"
					width="100%"
					height="300px"
				/>
				<img
					v-else
					class="card-img-top"
					src="@/../public/Images/No_image_available.jpg"
					alt="Pas d'image"
				/>
			</div>
			<div class="card-body">
				<div class="card-link" @click="getOneMessage">
					<h5 class="card-title">{{ post.title }}</h5>
					<p class="card-text">{{ post.description }}</p>
				</div>
				<div class="card-btn-group">
					<div class="btn-group">
						<button
							type="button"
							class="btn btn-sm btn-outline-secondary"
							aria-label="Supprimer"
							@click="deletePost"
							v-if="
								this.post.userId === this.user.userId ||
								this.user.isAdmin === true
							"
						>
							<i class="fa-solid fa-trash-can"></i>
						</button>
						<button
							type="button"
							class="btn btn-sm btn-outline-secondary"
							aria-label="Modifier"
							@click="modifyPost"
							v-if="
								this.post.userId === this.user.userId ||
								this.user.isAdmin === true
							"
						>
							<i class="fa-solid fa-pen-to-square"></i>
						</button>
					</div>
					<div class="btn-like">
						<div class="card-link" @click="sendLike">
							<i
								v-if="onLike === false"
								class="fa-solid fa-thumbs-up iconLike"
							></i>
							<i v-else class="fa-solid fa-thumbs-up iconOnLike"></i>
						</div>
						<div class="countLike">
							{{ likes }}
						</div>
					</div>
				</div>
			</div>
			<div class="card-footer">
				<small class="text-muted">{{ post.username }}</small>
				<small class="text-muted">{{ post.date }}</small>
			</div>
		</div>
	</div>
</template>

<script>
import router from '../router/index.js';
import { deleteMessage } from '@/utils/api.js';
import { sendLike } from '@/utils/api.js';
import { getOneMessage } from '@/utils/api.js';

export default {
	name: 'CardMessage',
	data() {
		return {
			likes: 0,
			onLike: false,
		};
	},
	props: {
		post: {
			type: Object,
		},
	},
	computed: {
		user() {
			return this.$store.getters.user;
		},
	},
	methods: {
		async deletePost() {
			const confirmPopUp = confirm(
				`Voulez-vous supprimer le post ${this.post.title} ?`
			);

			if (confirmPopUp) {
				const response = await deleteMessage(this.post._id, this.user.isAdmin);
				try {
					console.log(response);
					window.location.reload();
				} catch (error) {
					console.log(error);
				}
			}
		},
		modifyPost() {
			router.push({
				name: 'editmessage',
				params: { messageId: this.post._id },
			});
		},
		async sendLike() {
			const response = await sendLike(this.post._id, this.user.userId);
			try {
				console.log(response);
				this.likes = response.data.message.likes;
				const userInArray = response.data.message.usersLiked.includes(
					this.user.userId
				);
				if (userInArray) {
					this.onLike = true;
				} else {
					this.onLike = false;
				}
			} catch (error) {
				console.log(error);
			}
		},
		getOneMessage() {
			router.push({
				name: 'getonemessage',
				params: { messageId: this.post._id },
			});
		},
	},
	async mounted() {
		const response = await getOneMessage(this.post._id);
		try {
			this.likes = response.data.likes;
			const userInArray = response.data.usersLiked.includes(this.user.userId);
			if (userInArray) {
				this.onLike = true;
			}
		} catch (error) {
			console.log(error);
		}
		console.log(this.user, this.post);
	},
};
</script>

<style scoped lang="scss">
@import '@/../public/variable.scss';
.col {
	margin: 10px 0;
	@include tablet {
		width: 50%;
	}
	@include mobile {
		width: 100%;
	}
}

.card-img-top {
	height: 200px;
	width: 100%;
	object-fit: cover;
}

.card-footer {
	display: flex;
	justify-content: space-between;
	font-size: 17px;
}

.card-btn-group {
	display: flex;
	justify-content: space-between;
}

.btn-like {
	display: flex;
	align-items: center;
}

.countLike {
	display: flex;
	align-items: center;
	margin: 0 5px;
}

.iconLike {
	font-size: 20px;
	&:hover {
		color: green;
	}
}
.iconOnLike {
	color: green;
	font-size: 20px;
}

.btn-sm:hover {
	background-color: $color-primary;
}

.card-btn-group {
	margin-top: 10px;
}

.card-link {
	cursor: pointer;
}
</style>

// JS => camelCase // HTLM => Les deux // CSS => snake-case
