import { createRouter, createWebHistory } from 'vue-router'
import store from '@/vuex'

import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import Home from '@/views/Home.vue'
import Contributors from '@/views/Contributors.vue'

const routes = [
    { path: '/', redirect: '/dashboard' },
    { path: '/login', name: 'Login', component: Login },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        children: [
            { path: '', name: 'Home', component: Home },
            { path: 'contributors', name: 'Contributors', component: Contributors }
        ]
    },
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
