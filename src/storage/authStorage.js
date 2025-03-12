import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    getUser: (state) => state.user,
  },

  actions: {
    login(userData) {
      this.user = userData;
    },
    logout() {
      this.user = null;
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'auth',
        storage: sessionStorage, // Cambiado de localStorage a sessionStorage
      },
    ],
  },
});
