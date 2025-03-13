<script>

import {defineComponent} from "vue";
import LoginForm from "@/components/LoginForm.vue";

export default defineComponent({
  components: {LoginForm}
})
</script>

<template>
  <main class="auth-page">
    <section class="auth-page__section auth-page__section--info">
      <div class="auth-page__header">
        <h1 class="auth-page__title">Inicio de sesión</h1>
        <p class="auth-page__text">
          ¿No tienes cuenta? Puedes crearte una
          <router-link to="/register" class="auth-page__link">
            aquí
          </router-link>
        </p>
      </div>
    </section>

    <section class="auth-page__section auth-page__section--form">
      <div class="auth-page__content">
        <LoginForm />
      </div>
    </section>
  </main>
</template>

<style lang="sass" scoped>
    @use "@/SASS/pages/login"
</style>
