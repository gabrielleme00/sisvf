import { createApp } from 'vue'
import router from '@/router'
import store from './vuex'

import "@fontsource/open-sans/400.css"
import "@fontsource/open-sans/700.css"

import './style.less'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faRightFromBracket,
    faListCheck,
    faUser,
    faUsers,
    faMap,
    faCity,
    faBriefcase,
    faCheck,
    faXmark,
    faPenToSquare,
    faTrash,
    faCaretDown,
    faCaretRight,
    faBuilding,
    faDatabase,
    faBullseye,
    faCircleCheck,
} from '@fortawesome/free-solid-svg-icons'
library.add([
    faRightFromBracket,
    faListCheck,
    faUser,
    faUsers,
    faMap,
    faCity,
    faBriefcase,
    faCheck,
    faXmark,
    faPenToSquare,
    faTrash,
    faCaretDown,
    faCaretRight,
    faBuilding,
    faDatabase,
    faBullseye,
    faCircleCheck,
])

createApp(App)
    .use(router)
    .use(store)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
