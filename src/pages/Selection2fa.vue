<template>
  <main class="twofa-page">
    <h1>Seleccione un método 2FA</h1>
    <p>Esto se hace para asegurar una capa de protección extra a la hora de acceder a su cuenta, evitando posibles
      ataques a su seguridad y privacidad</p>

    <section>
      <Card2fa
          title="Email"
          :items="[
          { type: 'check', text: 'Rápido y cómodo' },
          { type: 'cross', text: 'Opción poco segura' }
        ]"
          type2fa="email"
      />
      <Card2fa
          title="Autenticador"
          :items="[
          { type: 'check', text: 'Segura y recomendada' },
          { type: 'cross', text: 'Requiere una aplicación ajena' }
        ]"
          type2fa="authenticator"
      />
    </section>
  </main>
</template>

<script>
import Card2fa from "@/components/Card2fa.vue";

export default {
  name: "Selection2fa",
  components: {Card2fa}
}
</script>

<style scoped lang="sass">
@use "@/SASS/pages/selector2fa"
</style>