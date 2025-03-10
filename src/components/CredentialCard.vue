<template>
    <article class="card" @click="redirectTo(`/credential/${id}`)" style="cursor: pointer;">
      <section class="card-content">
        <header>
          <img :src="imageUrl" /> <h3>{{ title }}</h3>
        </header>
        <main class="info">
          <p>{{ username }}</p>
          <p>{{ dateCreation }}</p>
        </main>
        <footer>
          </footer>
      </section>
    </article>
  </template>
  
  <script>
  import router from "@/router/index.js";
  
  export default {
    components: {}, // Ya no necesitamos importar Button
    props: {
      id: Number, // Usa Number en lugar de Integer
      title: String,
      username: String,
      dateCreation: String,
      web_image: String,
      type2fa: Boolean // Agrega type2fa si usas este prop en el componente Button
    },
    methods: {
      redirectTo(route) {
        router.push(route);
      },
    },
    computed: {
      imageUrl() {
        return `data:image/webp;base64,${this.web_image}`;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Opcional: Para mejorar la señalización de que es clickable */
  .card {
    transition: transform 0.2s ease-in-out; /* Opcional: Transición suave al hacer hover */
  }
  
  .card:hover {
    transform: scale(1.02); /* Opcional: Ligeramente más grande al hacer hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Opcional: Sombra más pronunciada al hacer hover */
  }
  </style>