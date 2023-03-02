import { createRouter, createWebHistory } from 'vue-router'
import store from '@/vuex'

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: Login },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from, next) => {
    const { isAuthenticated } = store.getters

    if (!isAuthenticated && to.name !== 'Login') {
        next({ name: 'Login' })
    } else {
        next()
    }
})


export default router
