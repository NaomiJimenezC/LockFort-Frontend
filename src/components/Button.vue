<script>
export default {
  name: "Button",
  props: {
    text: {
      type: String,
      required: true
    },
    action: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<template>
  <button type="button" @click="action" text="{{text}}">{{text}}</button>
</template>
<style scoped>

</style>