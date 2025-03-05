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
    },
    type2fa:{
      type: String,
    }
  }
}
</script>

<template>
  <button type="button" @click="action" text="{{text}}">{{text}}</button>
</template>
<style>

</style>