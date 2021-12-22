import { createRouter, createWebHistory } from "vue-router"
import store from "./store"

import FeedsPage from "./components/FeedsPage/FeedsPage.vue"
import TagTimelinePage from "./components/TagTimelinePage/TagTimelinePage.vue"
import HelloWorld from "./components/HelloWorld/HelloWorld.vue"
import TestPage from "./components/TestPage/TestPage.vue"

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


		// ------ Timelines ------ \\
		{
			name: 'homeTimeline',
			path: '/timelines/home',
			component: FeedsPage,
			props: { timeline: 'home' },
			meta: { auth: true } // FIXME: add auth validation
		},
		{
			name: 'communityTimeline',
			path: '/timelines/community',
			component: FeedsPage,
			props: { timeline: 'local' }
		},
		{
			name: 'globalTimeline',
			path: '/timelines/global',
			component: FeedsPage,
			props: { timeline: 'public' }
		},
		{
			name: 'tagTimeline',
			path: '/tags/:tag',
			component: TagTimelinePage,
			props: true
		},


		// ------ Profiles/users ------ \\
		{
			name: 'externalProfile',
			path: '/users/:bitch',
			component: TestPage,
			props: true
		},
		{
			name: 'localProfile',
			path: '/@:bitch',
			component: TestPage,
			props: true
		},
		{
			path: '/helloworld',
			component: HelloWorld
		},
	]
})

router.afterEach(() => {
	// Reset the page title everytime we navigate.
	store.dispatch('setPageTitle', '')
})

export default router