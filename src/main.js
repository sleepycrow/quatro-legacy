import * as Vue from 'vue'
import * as I18n from './i18n'

import App from './App.vue'
import router from './router.js'
import store from './store/'

// Set up I18n
const locale = (navigator.language || 'en').split('-')[0]
const i18n = I18n.createI18n()
I18n.setLanguage(i18n, locale)

var app

// Set up app
store.dispatch('fetchInstanceInfo')
	.then(() => {
		app = Vue.createApp(App)

		app.use(i18n)
		app.use(router)
		app.use(store)

		app.mount('#app')
	})