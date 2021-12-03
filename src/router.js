import { createRouter, createWebHistory } from "vue-router"

import FeedsPage from "./components/FeedsPage/FeedsPage.vue"
import HelloWorld from "./components/HelloWorld/HelloWorld.vue"

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			name: 'root',
			path: '/',
			redirect: () => {
				return '/timelines/global' // placeholder for now uwu
			}
		},
		{ name: 'homeTimeline', path: '/timelines/home', component: FeedsPage, props: { timeline: 'home' } }, // FIXME: add auth validation
		{ name: 'communityTimeline', path: '/timelines/community', component: FeedsPage, props: { timeline: 'local' } },
		{ name: 'globalTimeline', path: '/timelines/global', component: FeedsPage, props: { timeline: 'public' } },
		{path: '/helloworld', component: HelloWorld},
	]
})

export default router