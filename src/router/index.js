import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Home from "@/pages/Home.vue";
import Selection2fa from "@/pages/Selection2fa.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/2fa_selection',
        name: '2fa Selection',
        component: Selection2fa
    }
]

const router = createRouter({
    history: createWebHistory("/"),
    routes
})

export default router
