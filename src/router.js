import { createRouter, createWebHistory } from "vue-router"

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
			meta: { auth: true, i18nTitle: 'timelines.home' } // FIXME: add auth validation
		},
		{
			name: 'communityTimeline',
			path: '/timelines/community',
			component: FeedsPage,
			props: { timeline: 'local' },
			meta: { i18nTitle: 'timelines.local' }
		},
		{
			name: 'globalTimeline',
			path: '/timelines/global',
			component: FeedsPage,
			props: { timeline: 'public' },
			meta: { i18nTitle: 'timelines.public' } 
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

export default router