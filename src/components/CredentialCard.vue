<template>
  <article class="credentialCard" @click="redirectTo(`vault/credential/${id}`)">
    <section class="credentialCard__content">
      <header class="credentialCard__content__header">

        <img class="credentialCard__content__header__img" :src="web_image || defaultImage" />
        <h3 class="credentialCard__content__header__title">{{ title }}</h3>
      </header>
      <main class="credentialCard__content__info">
        <p>{{ username }}</p>
        <p>{{ formatDate(dateCreation) }}</p>
      </main>
      <footer></footer>
    </section>
  </article>
</template>

  <script>
  import router from "@/router/index.js";
  import defaultImage from '@/assets/icons8-default-image-48.png'

  export default {
    data(){
      return{
        defaultImage
      }
    }
    ,
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
      formatDate(dateString) {
      const date = new Date(dateString);
      if (isNaN(date)) return 'Fecha inválida';
      
      return new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }).format(date);
    },}
  };
  </script>

<style scoped lang="sass">
@use '@/sass/components/credentialCard'
</style>