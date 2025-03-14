import { defineStore } from 'pinia';

/**
 * @store
 * @name auth
 * @description This Pinia store manages the authentication state of the application. It stores the logged-in user's information and provides getters to check the login status and retrieve the user object. It also includes actions for logging in and logging out, and it persists the authentication state in sessionStorage.
 */
export const useAuthStore = defineStore('auth', {
  /**
   * @state
   * @description The state of the authentication store.
   * @returns {object} An object containing the user state.
   */
  state: () => ({
    /**
     * @property {object|null} user - The currently logged-in user's data. Null if no user is logged in.
     */
    user: null,
  }),

  /**
   * @getters
   * @description Getters for the authentication store.
   */
  getters: {
    /**
     * @getter isLoggedIn
     * @param {object} state - The current state of the store.
     * @returns {boolean} True if a user is logged in, false otherwise.
     */
    isLoggedIn: (state) => !!state.user,
    /**
     * @getter getUser
     * @param {object} state - The current state of the store.
     * @returns {object|null} The currently logged-in user's data, or null.
     */
    getUser: (state) => state.user,
  },

  /**
   * @actions
   * @description Actions for the authentication store.
   */
  actions: {
    /**
     * @action login
     * @description Sets the user state with the provided user data.
     * @param {object} userData - The user data to store upon login.
     * @returns {void}
     */
    login(userData) {
      this.user = userData;
    },
    /**
     * @action logout
     * @description Clears the user state, effectively logging the user out.
     * @returns {void}
     */
    logout() {
      this.user = null;
    },
  },

  /**
   * @persist
   * @description Configuration for persisting the store's state.
   */
  persist: {
    enabled: true,
    strategies: [
      {
        /**
         * @property {string} key - The key used to store the state in storage.
         */
        key: 'auth',
        /**
         * @property {object} storage - The storage mechanism to use (sessionStorage in this case).
         */
        storage: sessionStorage,
      },
    ],
  },
});