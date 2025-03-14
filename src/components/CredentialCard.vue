<template>
  <article class="credentialCard" @click="redirectTo(`vault/credential/${id}`)">
    <section class="credentialCard__content">
      <header class="credentialCard__content__header">
        <img class="credentialCard__content__header__img" :src="web_image" />
        <h3 class="credentialCard__content__header__title">{{ title }}</h3>
      </header>
      <main class="credentialCard__content__info">
        <p>{{ username }}</p>
        <p>{{ dateCreation }}</p>
      </main>
      <footer></footer>
    </section>
  </article>
</template>

  <script>
  import router from "@/router/index.js";

  export default {
    components: {},
    props: {
      id: Number,
      title: String,
      username: String,
      dateCreation: String,
      web_image: String,
    },
    methods: {
      redirectTo(route) {
        router.push(route);
      },
    },
  };
  </script>

<style scoped lang="sass">
@use '@/sass/components/credentialCard'
</style>