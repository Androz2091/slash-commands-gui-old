import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const proxyURL = 'http://149.91.89.127:3700';
const axiosDefaultOptions = {
    baseURL: `${proxyURL}/https://discord.com/api/v8`,
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

const getBaseURL = (state) => `/applications/${state.application.id}/${state.guildID ? `guilds/${state.guildID}/commands` : '/commands'}`;

const loadCommands = (commit, state) => {
    instance.get(getBaseURL(state)).then((cmdRes) => {
        commit('SET_COMMANDS', cmdRes.data);
    });
};

export default new Vuex.Store({
    state: {
        token: '',
        guildID: '',
        application: null,
        guild: null,
        commands: []
    },
    mutations: {
        SET_GUILD (state, guild) {
            state.guild = guild;
        },
        SET_APPLICATION (state, application) {
            state.application = application;
        },
        SET_COMMANDS (state, commands) {
            state.commands = commands;
        },
        SET_TOKEN (state, token) {
            state.token = token;
        },
        SET_GUILD_ID (state, guildID) {
            state.guildID = guildID;
        }
    },
    actions: {
        createCommand ({ commit, state }, data) {
            instance.post(getBaseURL(state), JSON.stringify(data)).then((res) => {
                console.log(res);
                console.log('post');
                loadCommands(commit, state);
            });
        },
        load ({ commit, state }) {
            instance.get('/users/@me').then((appRes) => {
                console.log(appRes);
                commit('SET_APPLICATION', appRes.data);
                if (!state.guildID) return;
                instance.get(`/guilds/${state.guildID}`).then((guildRes) => {
                    commit('SET_GUILD', guildRes.data);
                });
                loadCommands(commit, state);
            });
        },
        loadToken ({ commit }) {
            const token = window.localStorage.getItem('token');
            const guildID = window.localStorage.getItem('guildID');
            if (token) {
                commit('SET_TOKEN', token);
            }
            if (guildID) {
                commit('SET_GUILD_ID', guildID);
            }
        },
        saveToken ({ commit }, token) {
            window.localStorage.setItem('token', token);
            commit('SET_TOKEN', token);
        },
        saveGuildID ({ commit }, guildID) {
            window.localStorage.setItem('guildID', guildID);
            commit('SET_GUILD_ID', guildID);
        }
    },
    modules: {
    }
});
