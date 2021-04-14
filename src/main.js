import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import { holaClient }  from './http/hola-api'

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const app = createApp(App)

app.config.globalProperties.$holaClient = holaClient

app.use(store)
app.use(router)
app.mount('#app')