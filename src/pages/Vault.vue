<template>
  <section>
    <h1>Tus credenciales</h1>
  </section>
  <section>
    <aside>
      <FilterMenu/>
    </aside>
  </section>
</template>

<script>
import FilterMenu from '@/components/FilterMenu.vue'; // Asegúrate de que la ruta sea correcta

export default {
  name: 'VaultView',
  components: {
    FilterMenu,
  },
  
  methods: {
    handleSortResults(sortBy) {
      /**
       * Maneja el evento "sort-results" emitido por FilterResults.
       * @param {string} sortBy - El tipo de ordenamiento ('ascendente', 'descendente', 'antiguo', 'reciente').
       */
      console.log('Ordenar por:', sortBy);
      let sortedArray = [...this.resultados]; // Crear una copia del array original para ordenarlo y no mutar el original

      switch (sortBy) {
        case 'ascendente':
          sortedArray.sort((a, b) => a.name.localeCompare(b.name)); // Ordenar alfabéticamente ascendente por nombre
          break;
        case 'descendente':
          sortedArray.sort((a, b) => b.name.localeCompare(a.name)); // Ordenar alfabéticamente descendente por nombre
          break;
        case 'antiguo':
          sortedArray.sort((a, b) => new Date(a.dateCreation) - new Date(b.dateCreation)); // Ordenar por fecha de creación más antigua primero
          break;
        case 'reciente':
          sortedArray.sort((a, b) => new Date(b.dateCreation) - new Date(a.dateCreation)); // Ordenar por fecha de creación más reciente primero
          break;
        default:
          sortedArray = [...this.resultados]; // Si sortBy no coincide con ninguno, volver al orden original
      }
      this.resultadosOrdenados = sortedArray; // Actualizar el array de resultadosOrdenados con el array ordenado
    },
  },
}
</script>

<style scoped>
.vault-view-container {
  font-family: sans-serif;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
  color: #2D3748;
}

.resultados-list {
  list-style: none;
  padding: 0;
}

.resultado-item {
  background-color: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  color: #4A5568;
}

.resultados-list li:last-child {
  margin-bottom: 0;
}
</style>
