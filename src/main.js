import * as Vue from 'vue'

import App from './App.vue'
import router from './router.js'
import store from './store/'

const app = Vue.createApp(App)

// Use the various things
app.use(router);
app.use(store);

app.mount('#app')