import Vuex from "vuex"
import axios from "axios"
import createPersistedState from "vuex-plugin-persistedstate"

export default new Vuex.Store({
  state: {
    user: null,
    token: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post("/api/Login", credentials)
        const { Nome, Sessao } = response.data
        commit("SET_USER", Nome)
        commit("SET_TOKEN", Sessao)
        return { user: Nome, token: Sessao }
      } catch (error) {
        throw error
      }
    },
    async logout({ commit, state }) {
      try {
        const config = { headers: { Sessao: state.token } }
        const response = await axios.post("/api/Logout", null, config)
        const { Mensagem } = response.data
        commit("SET_USER", null)
        commit("SET_TOKEN", null)
        return Mensagem
      } catch (error) {
        throw error
      }
    },
    async fetchTable({ state }, endpoint) {
      try {
        const config = { headers: { Sessao: state.token } }
        const response = await axios.get(`/api/${endpoint}`, config)
        return response.data
      } catch (error) {
        throw error
      }
    },
    async editTable({ state }, { endpoint, data }) {
      try {
        const response = await axios.put(`/api/${endpoint}`, data, {
          headers: { Sessao: state.token, "Content-Type": "application/json" },
        })
        return response.data
      } catch (error) {
        throw error
      }
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token
    },
  },
  plugins: [createPersistedState()],
})
