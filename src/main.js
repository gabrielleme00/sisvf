import { createApp } from "vue"
import router from "@/router"
import store from "./vuex"

import "@fontsource/open-sans/400.css"
import "@fontsource/open-sans/700.css"

import "./style.less"
import App from "./App.vue"

import { library } from "./fontawesome"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

createApp(App)
  .use(router)
  .use(store)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app")

library.addToDom = false
