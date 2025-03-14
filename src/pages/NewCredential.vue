<script>
import NewCredentialForm from "@/components/NewCredentialForm.vue";

export default {
  name: "NewCredential",
  components: {NewCredentialForm}
}
</script>

<template>
  <h1>Nueva Credencial</h1>
  <NewCredentialForm/>
</template>

<style scoped lang="sass">
@use '@/sass/abstracts/variables'

h1
  font-size: var(--desktop-h1)
  text-align: center
  color: var(--color-primario-800)
</style>