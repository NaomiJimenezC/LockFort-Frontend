<script>
  import Button from "@/components/Button.vue";
  import {ErrorMessage, Field, Form} from "vee-validate";
  import * as yup from "yup";
  import axios from "axios";
  import router from "@/router/index.js";
  import { useAuthStore } from "@/storage/authStorage"; 

  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

  const urlBackend = import.meta.env.VITE_BACKEND_URL;

  const REQUEST_CODE_COOLDOWN_SECONDS = 60;

  export default {
    name: "Email2faVerification",
    components: {ErrorMessage, Field, Form, Button},
    data() {
      return {
        schema: yup.object().shape({
          code: yup.string()
              .required("Código requerido")
              .matches(/^[0-9]{6}$/, "El código debe ser de 6 dígitos numéricos"),
        }),
        isRequestCodeButtonDisabled: false,
        requestCodeButtonTimer: 0,
        requestCodeButtonInterval: null,
      };
    },
    setup() {
      const authStore = useAuthStore(); // Usamos el store de autenticación
      return { authStore };
  },
    methods: {
      async onSubmit(values, actions) {
        if (!actions.errors) {
          try {
            // CSRF token request removed
            const response = await axios.post(`${urlBackend}/auth/2fa/verify`, values); // withCredentials and withXSRFToken are globally configured
            if (response.status === 200) {
                  //APLICAR AQUI EL STORAGE AUTH
                  this.authStore.login(response.data.user); // Guardamos la info del usuario en el store
                  await router.push("/vault");
              }

          } catch (error) {
            console.error("Error en la verificación:", error);
            alert("Error al verificar el código. Por favor, inténtalo de nuevo.");
          }
        }
      },
      async sendEmail() {
        if (this.isRequestCodeButtonDisabled) {
          return;
        }
        try {
          const response = await axios.post(`${urlBackend}/auth/2fa/setup`, {'two_factor_type': 'email'});
          this.disableRequestCodeButton();
        } catch (error) {
          console.error("Error al solicitar nuevo código:", error);
          alert("No se pudo solicitar un nuevo código. Por favor, inténtalo de nuevo más tarde.");
        }
      },
      disableRequestCodeButton() {
        this.isRequestCodeButtonDisabled = true;
        this.requestCodeButtonTimer = REQUEST_CODE_COOLDOWN_SECONDS;
        this.requestCodeButtonInterval = setInterval(() => {
          this.requestCodeButtonTimer--;
          if (this.requestCodeButtonTimer <= 0) {
            this.enableRequestCodeButton();
          }
        }, 1000);
      },
      enableRequestCodeButton() {
        this.isRequestCodeButtonDisabled = false;
        this.requestCodeButtonTimer = 0;
        clearInterval(this.requestCodeButtonInterval);
        this.requestCodeButtonInterval = null;
      },
    },
    beforeUnmount() {
      clearInterval(this.requestCodeButtonInterval);
    },
  };
  </script>

  <template>
    <section>
      <h1>¡Último paso!</h1>
      <p>Para poder acceder a tu cuenta debes ingresar el código que le hemos enviado al correo. Recuerda revisar la bandeja de spam</p>
    </section>
    <section>
      <Form @submit="onSubmit" :validation-schema="schema">
        <label for="code">Código verificación</label>
        <Field
            type="text"
            id="code"
            name="code"
            placeholder="Introduce el código"
        />
        <ErrorMessage name="code" class="error-message" />
        <Button type="submit" text="Enviar"/>
        <Button
            :text="requestCodeButtonTimer > 0 ? `Solicitar código (${requestCodeButtonTimer}s)` : 'Solicitar código'"
            :disabled="isRequestCodeButtonDisabled"
            @click="sendEmail"
        />
      </Form>
    </section>
  </template>

  <style scoped>

  </style>