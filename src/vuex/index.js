import Vuex from 'vuex'
import axios from 'axios';
import createPersistedState from "vuex-plugin-persistedstate";

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
                const url = '/api/Login'
                const response = await axios.post(url, credentials)
                const { Nome, Sessao } = response.data
                commit('SET_USER', Nome)
                commit('SET_TOKEN', Sessao)
                return { user: Nome, token: Sessao }
            } catch (error) {
                throw error
            }
        },
        async logout({ commit }) {
            commit('SET_USER', null)
            commit('SET_TOKEN', null)
        },
    },
    getters: {
        isAuthenticated(state) {
            return !!state.token
        },
    },
    plugins: [createPersistedState()],
})