import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const axiosDefaultOptions = {
    headers: {
        'Content-Type': 'application/json'
    }
};
const instance = axios.create(axiosDefaultOptions);
instance.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('settings'));
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = token ? `Bot ${token}` : '';
    // eslint-disable-next-line no-param-reassign
    config.headers['X-Requested-With'] = window.location.href;
    return config;
});

export default new Vuex.Store({
    state: {

        commands: [],

        application: null,
        guild: null,
        settings: {
            token: '',
            guildID: '',
            proxyURL: 'http://149.91.89.127:3700'
        }
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
        SET_SETTINGS (state, settings) {
            state.settings = settings;
        }
    },
    actions: {
        saveData ({ commit }, data) {
            commit('SET_GUILD', data.guild);
            commit('SET_APPLICATION', data.application);
            window.localStorage.setItem('dataCache', JSON.stringify(data));
        },
        saveSettings ({ commit }, settings) {
            window.localStorage.setItem('settingsCache', JSON.stringify(settings));
            commit('SET_SETTINGS', settings);
        },
        loadCache ({ commit }) {
            const rawSettings = localStorage.getItem('settingsCache');
            if (rawSettings) {
                commit('SET_SETTINGS', JSON.parse(rawSettings));
                const rawData = localStorage.getItem('dataCache');
                if (rawData) {
                    const data = JSON.parse(rawData);
                    commit('SET_APPLICATION', data.application);
                    commit('SET_GUILD', data.guild);
                }
            }
        },
        setCommands ({ commit }, commands) {
            commit('SET_COMMANDS', commands);
        }
    },
    modules: {
    }
});
