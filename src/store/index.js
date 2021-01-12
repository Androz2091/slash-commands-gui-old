import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const axiosDefaultOptions = {
    baseURL: 'https://cors-anywhere.androz2091.fr/discord.com/api/v8',
    headers: {
        'Content-Type': 'application/json'
    }
};
const instance = axios.create(axiosDefaultOptions);
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = token ? `Bot ${token}` : '';
    // eslint-disable-next-line no-param-reassign
    config.headers['X-Requested-With'] = window.location.href;
    return config;
});

export default new Vuex.Store({
    state: {
        token: '',
        commands: []
    },
    mutations: {
        SET_COMMANDS (state, commands) {
            state.commands = commands;
        },
        SET_TOKEN (state, token) {
            state.token = token;
        }
    },
    actions: {
        loadCommands ({ commit }) {
            instance.get('/applications/676154105865175040/guilds/676095175038337064/commands').then((value) => {
                commit('SET_COMMANDS', value.data);
            });
        },
        loadToken ({ commit }) {
            const token = window.localStorage.getItem('token');
            if (token) {
                commit('SET_TOKEN', token);
            }
        },
        saveToken ({ commit }, token) {
            window.localStorage.setItem('token', token);
            commit('SET_TOKEN', token);
        }
    },
    modules: {
    }
});
