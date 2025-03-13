<script>
import Button from "@/components/Button.vue";

export default {
  name: "HomePage",
  components: { Button },
  methods: {
    redirectToLogin() {
      this.$router.push({ name: 'Login' });
    },
  }
}
</script>

<template>
    <!-- Sección Hero -->
    <section class="main__section">
      <h1>¡Bienvenidos a LockFort!</h1>
      <h2>Empieza a tener tus contraseñas en un lugar seguro</h2>
      <Button
          :action="redirectToLogin"
          text="¡Únete!"
      />
    </section>

    <!-- Sección Quiénes Somos -->
    <section class="middle__section">
        <img
            class=""
            src="@/assets/pexels-mikhail-nilov-6963098.webp"
            alt="Seguridad digital"
        >
        <article class="middle__section__text-wrapper">
          <h2>¿Quiénes somos?</h2>
          <p >
            Somos una aplicación que busca ofrecer una  solución para que puedas guardar tus contraseñas de
            las maneras más seguras, para que puedas estar con la conciencia tranquila frente a la imparable subida de ciberataques que nos amenazan todos los días con quitarnos nuestros datos más sensibles.
          </p>
        </article>
    </section>

  <section class="last__section">
    <article class="last__section__text-wrapper">
      <h3>¿Por qué usarnos?</h3>

      <ul class="benefits-list">
        <li class="benefits-list__item">
          <strong class="highlight">Nuestros servicios</strong> son totalmente gratuitos,  a diferencia de otras opciones populares, que deciden hacer negocio de nuestra seguridad.
        </li>
        <li class="benefits-list__item">
          Porque también te <strong class="highlight">avisaremos</strong> si a algunas de tus páginas han sufrido una brecha en sus datos.
        </li>
        <li class="benefits-list__item">
          Porque siempre te <strong class="highlight">sugeriremos</strong> contraseñas seguras para que nadie pueda descifrarlas fácilamente.
        </li>
      </ul>
    </article>

    <img
        class="last__section__image"
        src="@/assets/OCH-Blog-La-ciberseguridad-en-el-trabajo-en-casa-qrvbwz8wxqs08o32ehsq088yn4yc9rx8w1hfzcem60.webp"
        alt="Ciberseguridad"
    >
  </section>
</template>

<style scoped lang="sass">
 @use "@/SASS/pages/home"
</style>