import * as Vue from 'vue'
import * as I18n from './i18n'
import 'material-icons/iconfont/filled.css'
import 'material-icons/iconfont/outlined.css'

import App from './App.vue'
import router from './router.js'
import store from './store/'

// Set up I18n
const locale = (window.localStorage.getItem('locale') || navigator.language || 'en').split('-')[0]
const i18n = I18n.createI18n()
I18n.setLanguage(i18n, locale)

// Get info about instance and check if user's logged in before starting app
Promise.all([
	store.dispatch('attemptTokenRecovery'),
	store.dispatch('fetchInstanceInfo')
])
	.then(() => {
		// Set up app
		var app = Vue.createApp(App)

		app.use(i18n)
		app.use(router)
		app.use(store)

		app.mount('#app')
	})