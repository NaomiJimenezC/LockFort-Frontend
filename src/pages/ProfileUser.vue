<template>
  <article class="user-profile">
    <header class="user-profile__header">
      <h1 class="user-profile__title">Perfil de Usuario</h1>
    </header>

    <main v-if="currentUser" class="user-profile__content">
      <dl class="user-profile__info">
        <div class="user-profile__item">
          <dt class="user-profile__term">Nombre de usuario:</dt>
          <dd class="user-profile__description">{{ currentUser.username }}</dd>
        </div>
        <div class="user-profile__item">
          <dt class="user-profile__term">Email:</dt>
          <dd class="user-profile__description">{{ currentUser.email }}</dd>
        </div>
        <div class="user-profile__item">
          <dt class="user-profile__term">Fecha de nacimiento:</dt>
          <dd class="user-profile__description">{{ formattedBirthday }}</dd>
        </div>
        <div class="user-profile__item">
          <dt class="user-profile__term">2FA Tipo:</dt>
          <dd class="user-profile__description">{{ formattedTwoFactorType }}</dd>
        </div>
      </dl>

      <Button
          :action="editProfile"
          text="Editar Perfil"
          class="user-profile__button"
      />
    </main>

    <section v-else class="user-profile__loading">
      <p class="user-profile__loading-text">Cargando perfil...</p>
    </section>
  </article>
</template>

  <script>
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

<style lang="sass" scoped>
@use '@/sass/abstracts/variables'

.user-profile
  max-width: 800px
  margin: 2rem auto
  padding: 2rem
  background: var(--color-secundario-800)
  border-radius: 1rem
  box-shadow: 0 4px 12px rgba(var(--color-grises-800), 0.1)

  &__header
    border-bottom: 2px solid var(--color-primario-200)
    padding-bottom: 1.5rem
    margin-bottom: 2rem
    text-align: center

  &__title
    font-family: var(--tipografia-titulos), sans-serif
    font-size: var(--desktop-h2)
    color: var(--color-primario-800)
    margin: 0

  &__content
    display: grid
    gap: 2rem

  &__info
    display: grid
    gap: 1.5rem
    padding: 0
    margin: 0

  &__item
    display: grid
    grid-template-columns: 1fr 2fr
    gap: 1rem
    align-items: center
    padding: 1rem
    background: var(--color-primario-600)
    border-radius: 0.5rem
    box-shadow: 0 2px 6px rgba(var(--color-grises-300), 0.1)

  &__term
    font-family: var(--tipografia-titulos)
    font-size: var(--desktop-parrafo)
    color: var(--color-secundario-600)
    font-weight: 500
    margin: 0

  &__description
    font-family: var(--tipografia-titulos)
    font-size: var(--desktop-h3)
    color: var(--color-secundario-700)
    margin: 0
    word-break: break-word

  &__button
    justify-self: end
    padding: 0.75rem 2rem
    background: var(--color-primario-600)
    color: white
    border-radius: 0.25rem
    transition: all 0.3s ease

    &:hover
      background: var(--color-primario-700)
      transform: translateY(-1px)

  &__loading
    text-align: center
    padding: 2rem

  &__loading-text
    font-family: var(--tipografia-titulos)
    color: var(--color-grises-600)
    font-size: var(--desktop-parrafo)

  @media (max-width: 768px)
    margin: 1rem
    padding: 1.5rem
    border-radius: 0.5rem

    &__item
      grid-template-columns: 1fr
      gap: 0.5rem
      padding: 0.75rem

    &__term
      font-size: var(--mobile-parrafo)

    &__description
      font-size: var(--mobile-parrafo)

    &__title
      font-size: var(--mobile-h1)

    &__button
      width: 100%
      justify-self: center
</style>