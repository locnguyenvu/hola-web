import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import { holaClient }  from './http/hola-api'

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faEdit)

const app = createApp(App)

app.config.globalProperties.$holaClient = holaClient

app.component('font-awesome-icon', FontAwesomeIcon)
app.config.productionTip = false
app.use(store)
app.use(router)
app.mount('#app')
