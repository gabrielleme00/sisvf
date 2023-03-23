import Vuex from "vuex"
import axios from "axios"
import createPersistedState from "vuex-plugin-persistedstate"

const getApiConfig = state => {
  return {
    headers: { Sessao: state.token, "Content-Type": "application/json" },
  }
}

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
    async readRecords({ state }, endpoint) {
      try {
        return axios.get(`/api/${endpoint}`, getApiConfig(state))
      } catch (error) {
        throw error
      }
    },
    async updateRecord({ state }, { endpoint, data }) {
      try {
        return axios.put(`/api/${endpoint}`, data, getApiConfig(state))
      } catch (error) {
        throw error
      }
    },
    async createRecord({ state }, { endpoint, data }) {
      try {
        return axios.post(`/api/${endpoint}`, data, getApiConfig(state))
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
