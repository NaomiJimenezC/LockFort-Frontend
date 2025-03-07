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
    <Suspense fallback={null}>
      <router-view></router-view>
    </Suspense>
  </main>
</template>

<style scoped>
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1); /* Borde gris claro */
  border-top: 4px solid #3498db; /* Borde superior azul, color principal */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite; /* Animación de rotación */
  margin: 0 auto; /* Centrar horizontalmente si es necesario */
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
nav {
  display: flex;
  gap: 10px;
}
</style>
