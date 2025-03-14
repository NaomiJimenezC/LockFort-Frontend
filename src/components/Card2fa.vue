<template>
  <article class="card2fa">
    <section class="card2fa-content">
      <header class="card2fa__header">
        <h2 >{{ title }}</h2>
      </header>
      <div class="card2fa__info">
        <p v-for="(item, index) in items" :key="index" class="card2fa__item">
          <span v-if="item.type === 'check'" class="card2fa__icon card2fa__icon--check">&#10004;</span>
          <span v-else class="card2fa__icon card2fa__icon--cross">&#10008;</span>
          <span class="card2fa__text">{{ item.text }}</span>
        </p>
      </div>
      <footer class="card2fa__footer">
        <Button
            :action="() => redirectTo(`/2fa/${type2fa}_verification`)"
            text="Configurar"
            class="card2fa__button"
        />
      </footer>
    </section>
  </article>
</template>


<script>
import Button from "@/components/Button.vue";
import router from "@/router/index.js";
/**
 * @vue-component
 * @name Card2fa
 * @description This component displays information about a two-factor authentication method. It shows a title, a list of items indicating the status (checked or unchecked), and a button to navigate to the configuration page for that specific 2FA type.
 */
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

<style scoped lang="sass">
@use "@/sass/components/card2fa"
</style>