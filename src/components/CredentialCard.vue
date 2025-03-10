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
    computed: {
      imageUrl() {
        return `data:image/webp;base64,${this.web_image}`;
      },
    },
  };
  </script>

<style scoped>
.card {
  background-color: #4267B2; /* Azul Facebook, similar a la imagen */
  border-radius: 0.5rem; /* 8px - Bordes más redondeados */
  overflow: hidden; /* Para que los bordes redondeados funcionen con la imagen */
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1); /* 0 2px 4px rgba(0, 0, 0, 0.1) - Sombra suave */
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out; /* Transiciones para hover */
  cursor: pointer; /* Ya lo tienes en línea, pero lo dejo aquí por claridad */
  width: 15.625rem; /* 250px - Ancho fijo para las tarjetas, puedes ajustarlo */
  margin: 0.625rem; /* 10px - Margen alrededor de cada tarjeta para separarlas */
}

.card:hover {
  transform: scale(1.05); /* Ligeramente más grande al hacer hover */
  box-shadow: 0 0.375rem 0.75rem rgba(0, 0, 0, 0.2); /* 0 6px 12px rgba(0, 0, 0, 0.2) - Sombra más pronunciada al hacer hover */
}

.card-content {
  padding: 1.25rem; /* 20px */
  color: white; /* Texto blanco para contrastar con el fondo azul */
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Alinea los elementos a la izquierda */
}

.card-content header {
  display: flex;
  align-items: center;
  margin-bottom: 0.9375rem; /* 15px */
}

.card-content header img {
  width: 3.75rem; /* 60px - Tamaño de la imagen de perfil */
  height: 3.75rem; /* 60px - Tamaño de la imagen de perfil */
  border-radius: 50%; /* Círculo para la imagen de perfil */
  background-color: #f0f0f0; /* Fondo gris claro para el placeholder */
  margin-right: 0.9375rem; /* 15px */
  object-fit: cover; /* Asegura que la imagen se ajuste al círculo */
}

.card-content header h3 {
  font-size: 1.2rem; /* 1.2em - Tamaño de fuente un poco más grande (relativo al padre, en rem es relativo al root) */
  font-weight: bold; /* "Nombre del sitio" en negrita */
  margin: 0; /* Elimina márgenes por defecto del h3 */
}

.card-content main.info p {
  font-size: 0.9rem; /* 0.9em - Tamaño de fuente más pequeño (relativo al padre, en rem es relativo al root) */
  margin: 0.3125rem 0; /* 5px 0 - Espacio entre párrafos de información */
  color: #f0f0f0; /* Color de texto ligeramente más claro para la info */
}


</style>