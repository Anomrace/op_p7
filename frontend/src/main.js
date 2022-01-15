import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import axios from 'axios'
import './assets/main.css'

// axios.defaults.baseURL = 'http://localhost:8082/api/'


createApp(App).use(store).use(router).mount('#app')


