import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: Login
    },
    {
        path: '/home',
        component: Home
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

export default router;