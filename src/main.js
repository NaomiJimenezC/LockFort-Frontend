import './SASS/style.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/index.js";
import { createPinia } from 'pinia';
import piniaPersistedState from 'pinia-plugin-persistedstate';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faLightbulb, faArrowRightFromBracket, faUser, faArrowRightToBracket  } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faLightbulb, faArrowRightFromBracket, faUser,faArrowRightToBracket)

const pinia = createPinia();
pinia.use(piniaPersistedState);

createApp(App)
    .use(pinia)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon) // Register the Font Awesome component
    .mount('#app')