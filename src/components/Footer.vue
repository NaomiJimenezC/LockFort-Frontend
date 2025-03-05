<template>
  <footer class="footer">
    <div class="copyright">
      <p
          xmlns:cc="http://creativecommons.org/ns#"
          xmlns:dct="http://purl.org/dc/terms/"
      >
        <span property="dct:title">LockFort</span> está marcado con
        <a
            href="https://creativecommons.org/publicdomain/zero/1.0/?ref=chooser-v1"
            target="_blank"
            rel="license noopener noreferrer"
            style="display:inline-block;"
        >
          CC0 1.0
          <img
              style="height:22px;margin-left:3px;vertical-align:text-bottom;"
              src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"
              alt="Creative Commons Logo"
          />
          <img
              style="height:22px;margin-left:3px;vertical-align:text-bottom;"
              src="https://mirrors.creativecommons.org/presskit/icons/zero.svg"
              alt="CC0 Logo"
          />
        </a>
      </p>
    </div>
    <div class="contact">
      <h3>Contáctanos</h3>
      <!-- Agrega tu información de contacto aquí -->
    </div>
    <div class="social-media">
      <h3>Síguenos</h3>
      <ul>
        <li>
          <a
              href="https://twitter.com/lockfort"
              target="_blank"
              rel="noopener"
          >
            <svg
                data-feather="twitter"
                width="24"
                height="24"
                class="social-icon"
            ></svg>
          </a>
        </li>
        <li>
          <a
              href="https://instagram.com/lockfort"
              target="_blank"
              rel="noopener"
          >
            <svg
                data-feather="instagram"
                width="24"
                height="24"
                class="social-icon"
            ></svg>
          </a>
        </li>
        <li>
          <a
              href="https://bsky.app/profile/lockfort.bsky.social"
              target="_blank"
              rel="noopener"
          >
            <img
                src="https://bsky.app/static/favicon.png"
                alt="Bluesky Logo"
                class="social-icon"
            />
          </a>
        </li>
      </ul>
    </div>
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

<style>
.footer {
  background-color: #f8f8f8;
  padding: 40px;
  text-align: center;
  color: #333;
}

.copyright p {
  font-size: 14px;
  margin: 20px 0;
}

.social-media ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.social-media li {
  display: inline-block;
}

.social-icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
  opacity: 0.7;
  transition: transform 0.3s, opacity 0.3s;
}

.social-icon:hover {
  transform: scale(1.1);
  opacity: 1;
  color: #2c3e50;
}

a {
  display: inline-block;
  color: inherit;
  text-decoration: none;
}

@media (max-width: 768px) {
  .footer {
    padding: 20px;
  }

  .social-media ul {
    gap: 10px;
  }
}
</style>