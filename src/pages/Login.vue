<script>

import {defineComponent} from "vue";
import LoginForm from "@/components/LoginForm.vue";

export default defineComponent({
  components: {LoginForm}
})
</script>

<template>
  <section>
    <h1>Inicio de sesión</h1>
    <p>¿No tienes cuenta? Puedes crearte una <a href="/register">aquí</a></p>
  </section>
  <section>
    <LoginForm/>
  </section>
</template>
