import { createRouter, createWebHashHistory } from 'vue-router';
//import HomeView from '../views/HomeView.vue'

import Home from '../views/Home.vue';
import LoginForm from '../views/LoginForm.vue';
import SignIn from '../views/SignIn.vue';
import EditMessage from '../components/EditMessage.vue';
import GetOneMessage from '@/components/GetOneMessage.vue';

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
		path: '/edit/:messageId',
		name: 'editmessage',
		component: EditMessage,
	},
	{
		path: '/:messageId',
		name: 'getonemessage',
		component: GetOneMessage,
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
