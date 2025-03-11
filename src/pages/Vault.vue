<template>
  <section class="vault-view-container">
    <h1>Tus credenciales</h1>
    <section>
      <SearchBar :data="resultados" @filtered-data="updateResults" />
      <Button :action="() => router().push({ name: 'New Credential' })" text="+" />
      <FilterMenu :results="resultadosOrdenados" @sort="handleSortResults" />
      <div class="grid-container">
        <CredentialCard
            v-for="credential in resultadosOrdenados"
            :key="credential.id"
            :id="credential.id"
            :title="credential.title"
            :username="credential.encrypted_username"
            :dateCreation="credential.created_at"
            :web_image="credential.web_image"
        />
      </div>
      <!-- Paginación -->
      <section class="pagination">
        <Button
            :disabled="!pagination.prev_page_url"
            @click="fetchPage(pagination.prev_page_url)"
            text="Anterior"
        />
        <Button
            :disabled="!pagination.next_page_url"
            @click="fetchPage(pagination.next_page_url)"
            text="Siguiente"
        />
      </section>
    </section>
  </section>
</template>

<script>
import axios from 'axios';
import FilterMenu from '@/components/FilterMenu.vue';
import SearchBar from '@/components/SearchBar.vue';
import Button from '@/components/Button.vue';
import CredentialCard from '@/components/CredentialCard.vue';
import router from '@/router/index.js';

export default {
  name: 'VaultView',
  components: {
    FilterMenu,
    SearchBar,
    Button,
    CredentialCard,
  },
  data() {
    return {
      resultados: [],          // Datos originales obtenidos del backend
      resultadosOrdenados: [], // Datos filtrados/ordenados que se muestran
      pagination: {
        current_page: 1,
        last_page: 1,
        next_page_url: null,
        prev_page_url: null,
      },
    };
  },
  mounted() {
    this.obtenerDatos('http://localhost/api/credentials?page=1');
  },
  methods: {
    router() {
      return router;
    },
    obtenerDatos(url) {
      axios.get(url)
          .then(response => {
            // Se asume que la API devuelve la data paginada en response.data.data
            this.resultados = response.data.data;
            // Inicialmente, los datos mostrados son los originales
            this.resultadosOrdenados = response.data.data;
            // Actualización de metadatos de paginación
            this.pagination.current_page = response.data.current_page;
            this.pagination.last_page = response.data.last_page;
            this.pagination.next_page_url = response.data.next_page_url;
            this.pagination.prev_page_url = response.data.prev_page_url;
          })
          .catch(error => {
            console.error('Error al obtener los datos:', error);
          });
    },
    fetchPage(url) {
      if (url) {
        this.obtenerDatos(url);
      }
    },
    updateResults(filtered) {
      // Se actualiza el array de datos mostrados según el filtro aplicado en SearchBar
      this.resultadosOrdenados = filtered;
    },
    handleSortResults(sortBy) {
      // Se realiza el ordenamiento según el criterio recibido del FilterMenu
      let sortedArray = [...this.resultados];
      switch (sortBy) {
        case 'ascendente':
          sortedArray.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'descendente':
          sortedArray.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case 'antiguo':
          sortedArray.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
          break;
        case 'reciente':
          sortedArray.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          break;
        default:
          sortedArray = [...this.resultados];
      }
      this.resultadosOrdenados = sortedArray;
    },
  },
};
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

.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  padding: 20px 0;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
