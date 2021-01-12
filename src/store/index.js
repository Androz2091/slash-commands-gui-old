import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: ''
    },
    mutations: {
        SAVE_TOKEN (state, token) {
            window.localStorage.setItem('token', token);
            state.token = token;
        }
    },
    actions: {
        loadToken ({ commit }) {
            if (window.localStorage.getItem('token')) {
                commit('SAVE_TOKEN', window.localStorage.getItem('token'));
            }
        },
        saveToken ({ commit }, token) {
            commit('SAVE_TOKEN', token);
        }
    },
    modules: {
    }
});
