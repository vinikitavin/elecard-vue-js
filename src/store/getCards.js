import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cards: []
    },
    getters: {
        getCards(state) {
            return state.cards
        }
    },
    mutations: {
        setCards(state, data) {
            state.cards = data
        }
    },
    actions: {
        changeCards({ commit }, data) {
            commit('setCards', data)
        }
    }
})

