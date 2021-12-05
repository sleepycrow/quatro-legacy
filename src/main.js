import * as Vue from 'vue'
import * as I18n from './i18n'

import App from './App.vue'
import router from './router.js'
import store from './store/'

const locale = (navigator.language || 'en').split('-')[0]
const i18n = I18n.createI18n()
I18n.setLanguage(i18n, locale)

const app = Vue.createApp(App)

// Use the various things
app.use(i18n)
app.use(router)
app.use(store)

app.mount('#app')