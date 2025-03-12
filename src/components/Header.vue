<template>
  <header class="header">
    <section>
      <img class="" src="@/assets/lockfort.svg" alt="logo" />
      <h1>LockFort</h1>
    </section>

    <nav>
      <ul v-if="!authStore.isLoggedIn">
        <li>
          <font-awesome-icon icon="fa-solid fa-lightbulb" />
          <font-awesome-icon icon="fa-solid fa-arrow-right-to-bracket" @click="router().push({name: 'Login'})" />
        </li>
      </ul>

      <ul v-else>
        <li>
          <font-awesome-icon icon="fa-solid fa-lightbulb" />
          <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" @click="logout" />
          <font-awesome-icon icon="fa-solid fa-user" @click="router().push({name: 'User'})" />
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useAuthStore } from "@/storage/authStorage";
import router from "@/router/index.js";
import axios from "axios";

export default {
  name: "Header",
  components: { FontAwesomeIcon },

  data() {
    return {
      authStore: useAuthStore(),
      urlBackend: import.meta.env.VITE_BACKEND_URL,
    };
  },

  methods: {
    router() {
      return router
    },
    login() {
      this.authStore.login();

    },
    logout() {
      this.authStore.logout();
      axios.post(`${this.urlBackend}/logout`)
      router.push({ name: 'Home' });
    },
  },
};
</script>

<style scoped lang="sass">
@use "@/SASS/components/header"
</style>
