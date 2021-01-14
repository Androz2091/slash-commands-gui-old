import Vue from 'vue';
import './registerServiceWorker';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './store';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import router from './router';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: (h) => h(App)
}).$mount('#app');
