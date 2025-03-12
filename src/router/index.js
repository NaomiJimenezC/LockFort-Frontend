import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Home from "@/pages/Home.vue";
import Selection2fa from "@/pages/Selection2fa.vue";
import Email2faVerification from "@/pages/Email2faVerification.vue";
import Authenticator2faVerification from "@/pages/Authenticator2faVerification.vue";
import Vault from '@/pages/Vault.vue';
import CredentialPage from '@/pages/CredentialPage.vue';
import NewCredential from "@/pages/NewCredential.vue";
import EditCredentialInfo from "@/pages/EditCredentialInfo.vue";
import ProfileUser from '@/pages/ProfileUser.vue';
import EditCredentialForm from '@/components/EditCredentialForm.vue';
import EditProfileForm from '@/components/EditProfileForm.vue';

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
        path: '/vault/new_credential',
        name: 'New Credential',
        component: NewCredential
    },
    {
        path: '/vault/credential/:id',
        name: 'Credential',
        component: CredentialPage
    },
    {
        path: '/vault/credential/:id/edit',
        name: 'Edit Credential',
        component: EditCredentialInfo
    },
    {
        path: '/user',
        name: 'User',
        component: ProfileUser
    },
    {
        path: '/user/edit-profile',
        name: 'Edit profile',
        component: EditProfileForm
    }

]

const router = createRouter({
    history: createWebHistory("/"),
    routes
})

export default router
