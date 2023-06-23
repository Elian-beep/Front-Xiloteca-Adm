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
        component: Home,
        meta: {
            requiresAuth: true
        }
    }
];


const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if(to.meta.requiresAuth && !token){
        next('/');
    }else{
        next();
    }
})

export default router;