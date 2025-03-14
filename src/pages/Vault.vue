<template>
  <section class="vault-view-container">
    <h1 class="vault-view__title">Tus credenciales</h1>

    <section class="vault-view__search-section">
      <SearchBar
          :data="resultados"
          @filtered-data="updateResults"
          class="vault-view__search-bar"
      />
      <Button
          :action="() => router().push({ name: 'New Credential' })"
          text="+"
          class="vault-view__add-button"
      />
    </section>

    <div class="vault-view__main-content">
      <section class="vault-view__filter-section">
        <FilterMenu
            :results="resultadosOrdenados"
            @sort="handleSortResults"
            class="vault-view__filter-menu"
        />
      </section>

      <div class="vault-view__credentials-grid">
        <CredentialCard
            v-for="credential in resultadosOrdenados"
            :key="credential.id"
            :id="credential.id"
            :title="credential.title"
            :username="credential.encrypted_username"
            :dateCreation="credential.created_at"
            :web_image="credential.web_image"
            class="vault-view__credential-card"
        >
          <template #avatar>
            <div class="vault-view__credential-card-circle"></div>
          </template>
          <template #title>
            <div class="vault-view__credential-card-title">{{ credential.title }}</div>
          </template>
          <template #subtitle>
            <div class="vault-view__credential-card-subtitle">{{ credential.encrypted_username }}</div>
          </template>
          <template #date>
            <div class="vault-view__credential-card-date">{{ formatDate(credential.created_at) }}</div>
          </template>
        </CredentialCard>
      </div>
    </div>

    <section class="vault-view__pagination">
      <Button
          :disabled="!pagination.prev_page_url"
          @click="fetchPage(pagination.prev_page_url)"
          text="Anterior"
          class="vault-view__pagination-button vault-view__pagination-button--previous"
      />
      <Button
          :disabled="!pagination.next_page_url"
          @click="fetchPage(pagination.next_page_url)"
          text="Siguiente"
          class="vault-view__pagination-button vault-view__pagination-button--next"
      />
    </section>

    <div class="vault-view__results-info">
      1 de 1 resultados
    </div>
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
    CredentialCard
  },
  data() {
    return {
      urlBackend: import.meta.env.VITE_BACKEND_URL,
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
    this.obtenerDatos(`${import.meta.env.VITE_BACKEND_URL}/credentials`);
  },
  methods: {
    router() {
      return router;
    },
    obtenerDatos(url) {
      axios.get(url,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
          .then(response => {
            this.resultados = response.data.data;
            this.resultadosOrdenados = response.data.data;
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
      this.resultadosOrdenados = filtered;
    },
    handleSortResults(sortBy) {
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
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    }
  },
};
</script>

<style scoped lang="sass">
@use '@/sass/pages/vault'
</style>