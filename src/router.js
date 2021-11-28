import { createRouter, createWebHistory } from "vue-router"

import FeedsPage from "./components/FeedsPage/FeedsPage.vue"
import HelloWorld from "./components/HelloWorld/HelloWorld.vue"

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{path: '/', component: FeedsPage},
		{path: '/helloworld', component: HelloWorld},
	]
})

export default router