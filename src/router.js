import { createRouter, createWebHistory } from "vue-router"
import { pinia } from "./stores"
import { useInterfaceStore } from "./stores/interface"
import { useAuthStore } from "./stores/auth"

import FeedsPage from "./components/FeedsPage/FeedsPage.vue"
import TagTimelinePage from "./components/TagTimelinePage/TagTimelinePage.vue"
import StatusPage from "./components/StatusPage/StatusPage.vue"
import HelloWorld from "./components/HelloWorld/HelloWorld.vue"
import TestPage from "./components/TestPage/TestPage.vue"
import NotificationsPage from "./components/NotificationsPage/NotificationsPage.vue"
import BookmarksPage from "./components/BookmarksPage/BookmarksPage.vue"

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			name: 'root',
			path: '/',
			redirect: () => {
				return (useAuthStore(pinia).loggedIn ? '/timelines/home' : '/helloworld')
			}
		},


		// ------ Timelines ------ \\
		{
			name: 'homeTimeline',
			path: '/timelines/home',
			component: FeedsPage,
			props: { timeline: 'home' },
			meta: { authRequired: true }
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
		{
			name: 'bookmarksTimeline',
			path: '/bookmarks',
			component: BookmarksPage,
			meta: { authRequired: true }
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


		// ------ Idk ------ \\
		{
			name: 'status',
			path: '/statuses/:statusId',
			component: StatusPage,
			props: true
		},

		{
			name: 'notifications',
			path: '/notifications',
			component: NotificationsPage,
			meta: { authRequired: true }
		},
	]
})

router.beforeEach((to) => {
	if(to.meta.authRequired && !useAuthStore(pinia).loggedIn)
		return '/'
})

router.afterEach(() => {
	// Reset the page title everytime we navigate.
	useInterfaceStore(pinia).setPageTitle('')
})

export default router