import { createRouter, createWebHistory } from "vue-router"
import store from "@/vuex"

import Login from "@pages/Login.vue"
import Dashboard from "@pages/Dashboard.vue"
import Home from "@pages/Home.vue"

import Colaborador from "@views/Colaborador.vue"
import BaseCargo from "@views/BaseCargo.vue"
import BaseDepartamento from "@views/BaseDepartamento.vue"
import BaseItemChecklist from "@views/BaseItemChecklist.vue"
import BaseFinalidadeChecklist from "@views/BaseFinalidadeChecklist.vue"
import BaseGrupoChecklist from "@views/BaseGrupoChecklist.vue"

const routes = [
  { path: "/", redirect: "/dashboard" },
  { path: "/login", name: "Login", component: Login },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    children: [
      { path: "", name: "Home", component: Home },
      { path: "colaborador", name: "Colaborador", component: Colaborador },
      { path: "base-cargo", name: "BaseCargo", component: BaseCargo },
      {
        path: "base-departamento",
        name: "BaseDepartamento",
        component: BaseDepartamento,
      },
      {
        path: "base-item-checklist",
        name: "BaseItemChecklist",
        component: BaseItemChecklist,
      },
      {
        path: "base-finalidade-checklist",
        name: "BaseFinalidadeChecklist",
        component: BaseFinalidadeChecklist,
      },
      {
        path: "base-grupo-checklist",
        name: "BaseGrupoChecklist",
        component: BaseGrupoChecklist,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const { isAuthenticated } = store.getters

  if (!isAuthenticated && to.name !== "Login") {
    next({ name: "Login" })
  } else {
    next()
  }
})

export default router
