import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import { holaClient }  from './http/hola-api'
app.config.globalProperties.$holaClient = holaClient

import store from './store'
app.use(store)

app.use(router)
import router from './router'
app.mount('#app')