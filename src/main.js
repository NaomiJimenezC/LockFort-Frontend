import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/index.js";
import { createPinia } from 'pinia';
import piniaPersistedState from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPersistedState);

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')
