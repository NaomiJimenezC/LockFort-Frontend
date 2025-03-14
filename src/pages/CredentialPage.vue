<template>
  <div class="credential">
    <div class="credential__image-container">
      <img :src="credential?.web_photo" />
    </div>
    <h1 class="credential__title">{{ credential?.title || 'Cargando...' }}</h1>

    <div v-if="credential" class="credential__details">
      <div class="credential__detail-item">
        <label>Usuario/Email:</label>
        <span>{{ credential.encrypted_username }}</span>
      </div>

      <div class="credential__detail-item">
        <label>Contraseña:</label>
        <div class="credential__password-container">
          <span v-if="showPassword" class="credential__password-text">
            {{ credential.encrypted_password }}
          </span>
          <span v-else class="credential__password-masked">••••••••••</span>
          <button
              @click="togglePasswordVisibility"
              class="credential__toggle-password"
              type="button"
          >
            {{ showPassword ? 'Ocultar' : 'Mostrar' }}
          </button>
        </div>
      </div>

      <div class="credential__detail-item">
        <label>URL:</label>
        <a :href="credential.encrypted_url" target="_blank" class="credential__url-link">
          {{ credential.encrypted_url }}
        </a>
      </div>

      <div class="credential__detail-item">
        <label>Descripción:</label>
        <p class="credential__description">{{ credential.encrypted_notes }}</p>
      </div>

      <div class="credential__metadata">
        <span class="credential__creation-date">Creado el: {{ formattedCreationDate }}</span>
      </div>

      <div class="credential__action-buttons">
        <button
            @click="redirectToEditor"
            class="credential__action-button editor"
        >
          ✏️ Editar
        </button>

        <button
            @click="showDeleteConfirmation = true"
            class="credential__action-button delete"
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>

    <div v-else-if="error" class="credential__error-message">
      ❌ Error cargando la credencial: {{ error }}
    </div>

    <div v-else class="credential__loading-message">
      ⏳ Cargando información de la credencial...
    </div>

    <ModalConfirmacion
        :visible="showDeleteConfirmation"
        titulo="Eliminar credencial"
        mensaje="¿Estás seguro que deseas eliminar permanentemente esta credencial?"
        texto-confirmacion="Sí, eliminar"
        texto-cancelacion="Cancelar"
        @confirmado="confirmDelete"
        @cancelado="cancelDelete"
    />
  </div>
</template>

<script>
import axios from 'axios';
import ModalConfirmacion from '@/components/ModalConfirmation.vue';

export default {
  name: "CredentialPage",
  components: {
    ModalConfirmacion
  },
  data() {
    return {
      id: null,
      credential: null,
      error: null,
      showPassword: false,
      showDeleteConfirmation: false,
      urlBackend: import.meta.env.VITE_BACKEND_URL,
    };
  },
  computed: {
    formattedCreationDate() {
      if (!this.credential?.created_at) return '';
      const date = new Date(this.credential.created_at);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.fetchCredential();
  },
  methods: {
    async fetchCredential() {
      try {
        const response = await axios.get(
            `${this.urlBackend}/credentials/${this.id}`,
            { withCredentials: true }
        );

        if (response.data) {
          this.credential = response.data;
        } else {
          throw new Error('La credencial no existe');
        }

      } catch (err) {
        console.error("Error al obtener la credencial:", err);
        this.error = err.response?.data?.message || err.message || 'Error desconocido';
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    redirectToEditor() {
      this.$router.push({name: 'Edit Credential'});
    },
    confirmDelete() {
      // Lógica para eliminar la credencial
      console.log('Eliminando credencial...');
      this.showDeleteConfirmation = false;
      this.$router.push('/credentials');
    },
    cancelDelete() {
      this.showDeleteConfirmation = false;
    }
  }
}
</script>

<style scoped lang="sass">
@use '@/sass/pages/credentialInfo'
</style>