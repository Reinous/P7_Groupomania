import { createRouter, createWebHashHistory } from 'vue-router';
//import HomeView from '../views/HomeView.vue'

import Home from '../views/Home.vue';
import LoginForm from '../views/LoginForm.vue';
import SignIn from '../views/SignIn.vue';
import EditArticle from '../components/EditArticle.vue';
import GetOneArticle from '@/components/GetOneArticle.vue';

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
	},
	{
		path: '/login',
		name: 'login',
		component: LoginForm,
	},
	{
		path: '/signin',
		name: 'signin',
		component: SignIn,
	},
	{
		path: '/edit/:articleId',
		name: 'editarticle',
		component: EditArticle,
	},
	{
		path: '/:articleId',
		name: 'getonearticle',
		component: GetOneArticle,
	},
];

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   }
// ]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
