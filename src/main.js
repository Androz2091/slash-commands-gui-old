import Vue from 'vue';
import './registerServiceWorker';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './store';
import App from './App.vue';

Vue.use(Buefy);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
    store,
    render: (h) => h(App)
}).$mount('#app');
