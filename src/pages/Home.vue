<script>
import Button from "@/components/Button.vue";

export default {
  name: "Home",
  components: {Button},
  methods: {
    redirectToLogin() {
      this.$router.push({name: 'Login'});
    },
  }
}
</script>

<template>
<section>
  <h1>¡Bienvenidos a LockFort!</h1>
  <h2>Empieza a tener tus contraseñas en un lugar seguro</h2>
  <Button :action="redirectToLogin" text="¡Únete!"/>
</section>
<section>
  <img src="@/assets/pexels-mikhail-nilov-6963098.webp">
  <h3>¿Quiénes somos?</h3>
  <p>Somos una aplicación que busca ofrecer una  solución para que puedas guardar tus contraseñas de las maneras más
    seguras, para que puedas estar con la conciencia tranquila frente a la imparable subida de ciberataques que nos
    amenazan todos los días con quitarnos nuestros datos más sensibles.
  </p>
</section>
<section>
  <h3>¿Por qué usarnos?</h3>
  <ul>
    <li>
      Nuestros servicios son totalmente gratuitos, a diferencia de otras opciones populares, que deciden hacer negocio de nuestra seguridad.
    </li>
    <li>
      Porque también te avisaremos si a algunas de tus páginas han sufrido una brecha en sus datos.
    </li>
    <li>
      Porque siempre te sugeriremos contraseñas seguras para que nadie pueda descifrarlas fácilamente
    </li>
  </ul>
  <img src="@/assets/OCH-Blog-La-ciberseguridad-en-el-trabajo-en-casa-qrvbwz8wxqs08o32ehsq088yn4yc9rx8w1hfzcem60.webp">
</section>
</template>

<style scoped>

</style>