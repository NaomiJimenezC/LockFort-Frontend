// stores/authStorage.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),

  actions: {
    login(userData) {
      this.user = userData; // Guarda el usuario en el estado
    },
    logout() {
      this.user = null; // Elimina el usuario del estado
    }
  },

  persist: true, // Activa la persistencia con el plugin
});
