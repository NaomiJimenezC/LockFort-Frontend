<template>
  <footer class="footer">
    <section class="footer__copyright">
      <a
          href="https://creativecommons.org/publicdomain/zero/1.0/?ref=chooser-v1"
          target="_blank"
          rel="license noopener noreferrer"
          style="display:inline-block;"
      >
        <h3
            xmlns:cc="http://creativecommons.org/ns#"
            xmlns:dct="http://purl.org/dc/terms/"
        >
          <span property="dct:title">LockFort</span> está marcado con CC0 1.0
        </h3>
      </a>
    </section>

    <!-- Bloque contacto -->
    <section class="footer__contact">
      <h3>Contáctanos</h3>
      <!-- Información de contacto -->
    </section>

    <!-- Bloque redes sociales -->
    <section class="footer__social-media">
      <h3>Síguenos</h3>
      <ul>
        <li>
          <a href="https://twitter.com/lockfort" target="_blank" rel="noopener">
            <svg data-feather="twitter" width="24" height="24" class="social-icon"></svg>
          </a>
        </li>
        <li>
          <a href="https://instagram.com/lockfort" target="_blank" rel="noopener">
            <svg data-feather="instagram" width="24" height="24" class="social-icon"></svg>
          </a>
        </li>
        <li>
          <a href="https://bsky.app/profile/lockfort.bsky.social" target="_blank" rel="noopener">
            <img
                src="https://bsky.app/static/favicon.png"
                alt="Bluesky Logo"
                class="social-icon"
            />
          </a>
        </li>
      </ul>
    </section>
  </footer>
</template>

<script>
import feather from "feather-icons";

export default {
  name: "Footer",
  mounted() {
    feather.replace();
  },
};
</script>

<style lang="sass">
  @use "@/sass/components/_footer.scss";
</style>
