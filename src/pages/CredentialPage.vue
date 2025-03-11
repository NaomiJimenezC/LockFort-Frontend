<template>
  <div class="credential-container">
    <div class="image-container">
      <img :src="credential?.web_photo" />
    </div>
    <h1 class="title">{{ credential?.title || 'Cargando...' }}</h1>

    <div v-if="credential" class="credential-details">
      <div class="detail-item">
        <label>Usuario/Email:</label>
        <span>{{ credential.encrypted_username }}</span>
      </div>

      <div class="detail-item">
        <label>Contraseña:</label>
        <div class="password-container">
          <span v-if="showPassword" class="password-text">
            {{ credential.encrypted_password }}
          </span>
          <span v-else class="password-masked">••••••••••</span>
          <button
              @click="togglePasswordVisibility"
              class="toggle-password"
              type="button"
          >
            {{ showPassword ? 'Ocultar' : 'Mostrar' }}
          </button>
        </div>
      </div>

      <div class="detail-item">
        <label>URL:</label>
        <a :href="credential.encrypted_url" target="_blank" class="url-link">
          {{ credential.encrypted_url }}
        </a>
      </div>

      <div class="detail-item">
        <label>Descripción:</label>
        <p class="description">{{ credential.encrypted_notes }}</p>
      </div>

      <div class="metadata">
        <span class="creation-date">Creado el: {{ formattedCreationDate }}</span>
      </div>

      <div class="action-buttons">
        <button
            @click="redirectToEditor"
            class="action-button editor"
        >
          ✏️ Editar
        </button>

        <button
            @click="showDeleteConfirmation = true"
            class="action-button delete"
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>

    <div v-else-if="error" class="error-message">
      ❌ Error cargando la credencial: {{ error }}
    </div>

    <div v-else class="loading-message">
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

<style scoped>
.credential-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-container {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
}

.credential-container img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Changed to contain to fit image fully */
  display: block;
}


.title {
  color: #2c3e50;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.detail-item {
  margin-bottom: 1rem;
  padding: 0.8rem;
  background: white;
  border-radius: 6px;
}

.detail-item label {
  display: block;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 0.3rem;
}

.password-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.password-masked {
  letter-spacing: 0.2em;
  font-family: monospace;
}

.password-text {
  font-family: monospace;
  letter-spacing: 0.05em;
  color: #2c3e50;
}

.toggle-password {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s ease;
}

.toggle-password:hover {
  background: #2980b9;
}

.url-link {
  color: #3498db;
  text-decoration: none;
  word-break: break-all;
}

.url-link:hover {
  text-decoration: underline;
}

.description {
  color: #7f8c8d;
  line-height: 1.6;
  margin: 0.5rem 0;
}

.metadata {
  margin-top: 1.5rem;
  font-size: 0.9em;
  color: #95a5a6;
}

.loading-message {
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
}

.error-message {
  padding: 1rem;
  background: #f8d7da;
  color: #721c24;
  border-radius: 4px;
  border: 1px solid #f5c6cb;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.action-button {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-button.editor {
  background: #3498db;
  color: white;
}

.action-button.delete {
  background: #e74c3c;
  color: white;
}

.action-button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
</style>