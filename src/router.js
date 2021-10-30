import { createRouter, createWebHashHistory } from "vue-router"

import FeedsPage from "./components/FeedsPage/FeedsPage.vue"
import HelloWorld from "./components/HelloWorld/HelloWorld.vue"

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{path: '/', component: FeedsPage},
		{path: '/helloworld', component: HelloWorld},
	]
})

export default router