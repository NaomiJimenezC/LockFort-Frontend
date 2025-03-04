<template>
  <div class="card">
    <div class="card-content">
      <h2>{{ title }}</h2>
      <div class="info">
        <p v-for="(item, index) in items" :key="index">
          <span v-if="item.type === 'check'" class="check">&#10004;</span>
          <span v-else class="cross">&#10008;</span>
          {{ item.text }}
        </p>
      </div>
      <Button text=""/> {/*terminar esto*/}
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  components: {Button},
  props: {
    title: String,
    items: Array,
    buttonText: String,
  },
};
</script>

<style scoped>

</style>