<script setup>
</script>

<template>
  <header>
    <h1>Mi Aplicación</h1>
    <nav>
      <router-link to="/">Inicio</router-link>
      <router-link to="/login">Iniciar Sesión</router-link>
    </nav>
  </header>

  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped>
/* Estilos opcionales */
nav {
  display: flex;
  gap: 10px;
}
</style>
