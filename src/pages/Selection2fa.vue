<script>
import Card2fa from "@/components/Card2fa.vue";

export default {
  name: "Selection2fa",
  components: {Card2fa}
}
</script>

<template>
  <h1>Seleccione un método 2FA</h1>
  <p>Esto se hace para asegurar una capa de protección extra a la hora de acceder a su cuenta, evitando posibles
  ataques a su seguridad y privacidad</p>

  <section>
    <Card2fa>
  </section>
</template>

<style scoped>

</style>