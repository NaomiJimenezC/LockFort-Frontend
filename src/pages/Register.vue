<script>
import RegisterForm from "@/components/RegisterForm.vue";

export default {
  name: "Register",
  components: {RegisterForm}
}
</script>

<template>
<main class="auth-page">
  <section class="auth-page__section auth-page__section--info">
    <div class="auth-page__header">
      <h1 class="auth-page__title">Register</h1>
      <p class="auth-page__text">Créate una cuenta para empezar a tener tus credenciales seguras</p>
      <p class="auth-page__text"> Si tienes una cuenta puedes acceder a ella desde
          <router-link to="/login" class="auth-page__link">aquí</router-link>
      </p>
    </div>
  </section>

  <section class="auth-page__section auth-page__section--form">
    <div class="auth-page__content">
      <RegisterForm/>
    </div>
  </section>
</main>

</template>

<style scoped lang="sass">
@use "@/SASS/pages/login"
</style>