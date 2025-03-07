<template>
  <article class="card">
    <section class="card-content">
      <header>
        <h2>{{ title }}</h2>
      </header>
      <div class="info">
          <p v-for="(item, index) in items" :key="index">
            <span v-if="item.type === 'check'" class="check">&#10004;</span>
            <span v-else class="cross">&#10008;</span>
            {{ item.text }}
          </p>
      </div>
      <footer>
        <Button :action="() => redirectTo(`/2fa/${type2fa}_verification`)" text="Configurar" :type2fa="type2fa"/>
      </footer>
    </section>
  </article>
</template>


<script>
import Button from "@/components/Button.vue";
import router from "@/router/index.js";

export default {
  components: {Button},
  props: {
    title: String,
    items: Array,
    type2fa: String,
  },
  methods: {
    redirectTo(route) {
      router.push(route);
    },

  }
};
</script>

<style scoped>

</style>