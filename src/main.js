import * as Vue from 'vue'
import * as I18n from './i18n'
import { fetchInstanceInfo, fetchNodeInfo } from './lib/api'

import App from './App.vue'
import router from './router.js'
import store from './store/'

// Set up I18n
const locale = (navigator.language || 'en').split('-')[0]
const i18n = I18n.createI18n()
I18n.setLanguage(i18n, locale)

var app

// Set up app
prepareForApp()
	.then(() => {
		app = Vue.createApp(App)

		app.use(i18n)
		app.use(router)
		app.use(store)

		app.mount('#app')
	})

// --- that's it! below's just the nitty-gritty ---

async function prepareForApp(){
	var info = await Promise.all([ fetchInstanceInfo(), fetchNodeInfo() ])
	var instanceInfo = info[0] 
	var nodeInfo = info[1]

	store.commit('setInstanceValue', { key: 'nodeName', value: nodeInfo.metadata.nodeName })
	store.commit('setInstanceValue', { key: 'nodeDescription', value: nodeInfo.metadata.nodeDescription })
	store.commit('setInstanceValue', { key: 'openRegistrations', value: nodeInfo.metadata.openRegistrations })
	store.commit('setInstanceValue', { key: 'maxStatusLength', value: instanceInfo.max_toot_chars })
}