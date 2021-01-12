import Vue from 'vue';
import './registerServiceWorker';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import store from './store';
import App from './App.vue';

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
    store,
    render: (h) => h(App)
}).$mount('#app');
