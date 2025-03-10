<template>
    <div class="filter-container">
      <h3 class="filter-title">Filtrar resultados</h3>
      <ul class="filter-options">
        <li class="filter-item">
          <button class="filter-button" @click="emitSort('ascendente')">
            <span class="filter-icon">
              </span>
            Ascendiente
          </button>
        </li>
        <li class="filter-item">
          <button class="filter-button" @click="emitSort('descendente')">
            <span class="filter-icon">
              </span>
            Descendiente
          </button>
        </li>
        <li class="filter-item">
          <button class="filter-button" @click="emitSort('antiguo')">
            <span class="filter-icon">
              </span>
            Más antigüos
          </button>
        </li>
        <li class="filter-item">
          <button class="filter-button" @click="emitSort('reciente')">
            <span class="filter-icon">
              </span>
            Más recientes
          </button>
        </li>
      </ul>
    </div>
  </template>

  <script>
  export default {
    name: 'FilterMenu',
    props: {
      /**
       * Array de resultados a filtrar.
       * @type {Array}
       * @required
       */
      results: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        // No se necesita data local en este componente para la funcionalidad actual
      };
    },
    methods: {
      /**
       * Emite un evento "sort-results" al componente padre,
       * indicando el tipo de ordenamiento seleccionado.
       *
       * @param {string} sortBy - Tipo de ordenamiento ('ascendente', 'descendente', 'antiguo', 'reciente').
       */
      emitSort(sortBy) {
        this.$emit('sort-results', sortBy);
      },
    },
  }
  </script>

  <style scoped>
  .filter-container {
    background-color: #E0E7FF;
    border-radius: 0.5rem;
    padding: 1rem;
    width: 200px;
    font-family: sans-serif;
  }

  .filter-title {
    color: #1E293B;
    font-size: 1.25rem;
    margin-bottom: 1rem;
    font-weight: bold;
  }

  .filter-options {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .filter-item {
    margin-bottom: 0.5rem;
  }

  .filter-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    border: none;
    background-color: transparent;
    color: #334155;
    border-radius: 0.375rem;
    cursor: pointer;
    width: 100%;
    text-align: left;
    font-size: 1rem;
  }

  .filter-button:hover {
    background-color: #CBD5E1;
  }

  .filter-icon {
    display: flex;
    justify-content: center;
    width: 1.5rem;
  }

  .filter-icon svg {
    width: 1.25rem;
    height: 1.25rem;
    color: #475569; /* Por si acaso se quiere volver a poner iconos SVG, se mantiene el estilo */
  }
</style>