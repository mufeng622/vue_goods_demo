import Vue from 'vue';
import App from './App';
import store from './store/store';
import router from './router';
import axios from 'axios';

Vue.prototype.axios = axios;

new Vue({
    el: '#app',
    store,
    router,
    components: {App},
    template: '<App />'
});
