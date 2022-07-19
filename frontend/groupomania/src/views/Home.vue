<template>
	<div class="home" v-if="this.user.token !== null">
		<AddMessage />
		<div class="row row-cols-3">
			<CardMessage v-for="post in allPosts" v-bind:key="post.id" :post="post" />
		</div>
	</div>
</template>

<script>
import CardMessage from '../components/CardMessage.vue';
import AddMessage from '@/components/AddMessage.vue';
import { getAllMessages } from '@/utils/api';

export default {
	name: 'HomeMessage',
	data() {
		return {
			post: {
				title: '',
				description: '',
				imageUrl: '',
				username: '',
				date: '',
			},
			allPosts: [],
		};
	},
	computed: {
		user() {
			return this.$store.getters.user;
		},
	},
	components: {
		CardMessage,
		AddMessage,
	},
	async mounted() {
		const response = await getAllMessages();
		try {
			console.log(response);
			this.allPosts = response.data;
		} catch (error) {
			console.log(error);
		}
	},
};
</script>

<style scoped lang="scss">
@import '@/../public/variable.scss';

.row {
	margin: 0 10px;
	justify-content: center;
	flex-wrap: wrap-reverse;
	flex-direction: row-reverse;
	@include mobile {
	}
	@include tablet {
	}
}

h2 {
	font-size: 1.3em;
}

.title {
	margin-top: 20px;
	font-size: 30px;
}
</style>
