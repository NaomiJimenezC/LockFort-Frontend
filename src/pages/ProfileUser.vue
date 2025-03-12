<template>
    <article class="user-profile">
      <header class="profile-header">
        <h1 class="profile-title">Perfil de Usuario</h1>
      </header>

      <main v-if="currentUser" class="profile-content">
        <dl class="profile-info">

          <div class="profile-item">
            <dt>Nombre de usuario:</dt>
            <dd>{{ currentUser.username }}</dd>
          </div>
          <div class="profile-item">
            <dt>Email:</dt>
            <dd>{{ currentUser.email }}</dd>
          </div>
          <div class="profile-item">
            <dt>Fecha de nacimiento:</dt>
            <dd>{{ formattedBirthday }}</dd>
          </div>
          <div class="profile-item">
            <dt>2FA Tipo:</dt>
            <dd>{{ formattedTwoFactorType }}</dd>
          </div>
        </dl>
        <Button :action="editProfile" text="Enviar"/>
      </main>

      <section v-else class="loading-container">
        <p class="loading-text">Cargando perfil...</p>
      </section>
    </article>
  </template>

  <script>
import router from '@/router/index';
import { useAuthStore } from '@/storage/authStorage';
import Button from '@/components/Button.vue';


  export default {
    name: 'UserProfile',
    components:{Button},
    computed: {
      currentUser() {
        const authStore = useAuthStore();
        return authStore.user;
      },

      formattedBirthday() {
        return this.formatDate(this.currentUser && this.currentUser.birthday);
      },

      formattedTwoFactorType() {
        if (this.currentUser && this.currentUser.two_factor_type) {
          return this.currentUser.two_factor_type.charAt(0).toUpperCase() +
                 this.currentUser.two_factor_type.slice(1);
        }
        return 'N/A';
      }
    },
    methods: {
      formatDate(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      },
      editProfile() {
        this.$router.push({ name: 'Edit profile' });
    }
    }
  };
  </script>

  <style scoped>
  .user-profile {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .profile-header {
    text-align: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }

  .profile-title {
    color: #333;
    font-size: 24px;
  }

  .profile-content {
    padding: 20px;
  }

  .profile-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .profile-item dt {
    font-weight: bold;
    color: #6c757d;
    margin-bottom: 5px;
  }

  .profile-item dd {
    margin: 0;
    color: #333;
  }

  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
  }

  .loading-text {
    color: #666;
    font-style: italic;
  }
  </style>