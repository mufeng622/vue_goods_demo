import Vue from 'vue';
import Router from 'vue-router';
import Goods from './components/Goods';
import Discount from './components/Discount';
import Shoper from './components/Shoper';

Vue.use(Router);

const routes = [
    {
        path: '/goods',
        component: Goods
    },
    {
        path: '/discount',
        component: Discount
    },
    {
        path: '/shoper',
        component: Shoper
    },
    {
        path: '/',
        component: Goods
    },
    {
        path: '*',
        redirect: '/goods'
    }
];

export default new Router({
    mode: 'history',
    routes
})
