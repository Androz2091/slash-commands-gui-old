import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('../views/Settings.vue')
    },
    {
        // eslint-disable-next-line no-useless-escape
        path: '\/commands\/([a-z0-9]+)(\/sub\/[a-z0-9]+)*',
        name: 'Command Config',
        component: () => import('../views/SlashCommandConfig.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
