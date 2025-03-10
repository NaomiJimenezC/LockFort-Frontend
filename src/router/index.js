import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Home from "@/pages/Home.vue";
import Selection2fa from "@/pages/Selection2fa.vue";
import Email2faVerification from "@/pages/Email2faVerification.vue";
import Authenticator2faVerification from "@/pages/Authenticator2faVerification.vue";
import Vault from '@/pages/Vault.vue';
import PagePassword from '@/pages/PagePassword.vue';

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
        path: '/2fa',
        name: '2fa Selection',
        component: Selection2fa
    },
    {
        path: '/2fa/email_verification',
        name: '2fa_email_verification',
        component:Email2faVerification
    },
    {
        path: '/2fa/authenticator_verification',
        name: '2fa_authenticator_verification',
        component: Authenticator2faVerification
    },{
        path: '/vault',
        name: 'Vault',
        component: Vault
    },{
        path: '/vault/credential/{id}',
        name: 'Credential',
        component: PagePassword
    },

]

const router = createRouter({
    history: createWebHistory("/"),
    routes
})

export default router
