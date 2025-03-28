<script>
import Button from "@/components/Button.vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
import axios from "axios";
import router from "@/router/index.js";
import { useAuthStore } from "@/storage/authStorage";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const urlBackend = import.meta.env.VITE_BACKEND_URL;
const REQUEST_CODE_COOLDOWN_SECONDS = 60;
/**
 * @vue-component
 * @name Email2faVerification
 * @description This component handles the verification process for two-factor authentication using email. It prompts the user to enter a 6-digit code sent to their email address. It includes functionality to request a new code, with a cooldown timer to prevent abuse. Upon successful verification, it stores the access token, logs the user in, and redirects them to the vault.
 */
export default {
  name: "Email2faVerification",
  components: { ErrorMessage, Field, Form, Button },
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
      authStore: useAuthStore(), // Move authStore to data for Options API
    };
  },
  methods: {
    /**
     * @function onSubmit
     * @description Handles the submission of the verification code entered by the user. It sends a POST request to the backend to verify the code. If successful, it stores the access token in local storage, logs the user in using the auth store, and navigates to the vault. If there's an error, it displays an alert message.
     * @param {object} values - An object containing the form values, specifically the 'code'.
     * @param {object} actions - An object provided by vee-validate containing form actions (not used in this implementation).
     * @returns {void}
     */
    onSubmit(values, actions) {
      if (!actions.errors) {
        axios.post(`${urlBackend}/auth/2fa/verify`, values)
          .then(response => {
            if (response.status === 200) {
              localStorage.setItem("token", response.data.access_token);
              this.authStore.login(response.data.user);
              router.push("/vault");
            }
          })
          .catch(error => {
            console.error("Error en la verificación:", error);
            alert("Error al verificar el código. Por favor, inténtalo de nuevo.");
          });
      }
    },
    /**
     * @function sendEmail
     * @description Sends a request to the backend to send a new verification code to the user's email address. It disables the request code button and starts a cooldown timer to prevent frequent requests.
     * @returns {void}
     */
    sendEmail() {
      if (this.isRequestCodeButtonDisabled) {
        return;
      }
      axios.post(`${urlBackend}/auth/2fa/setup`, { 'two_factor_type': 'email' })
        .then(() => {
          this.disableRequestCodeButton();
        })
        .catch(error => {
          console.error("Error al solicitar nuevo código:", error);
          alert("No se pudo solicitar un nuevo código. Por favor, inténtalo de nuevo más tarde.");
        });
    },
    /**
     * @function disableRequestCodeButton
     * @description Disables the request code button and starts a timer for the cooldown period.
     * @returns {void}
     */
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
    /**
     * @function enableRequestCodeButton
     * @description Enables the request code button and clears the cooldown timer.
     * @returns {void}
     */
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
  <div class="email2fa">
    <main class="verificator">
      <section class="verificator__header">
        <h1 class="verificator__title">¡Último paso!</h1>
        <p class="verificator__text">
          Para poder acceder a tu cuenta debes ingresar el código que le hemos enviado al correo.
          <span class="verificator__highlight">Recuerda revisar la bandeja de spam</span>
        </p>
      </section>

      <section class="verificator__form">
        <Form @submit="onSubmit" :validation-schema="schema" class="verificator__form-container">
          <div class="verificator__input-group">
            <label class="verificator__label" for="code">Código de verificación</label>
            <Field
                type="text"
                id="code"
                name="code"
                placeholder="Ej: 123456"
                class="verificator__input"
            />
            <ErrorMessage name="code" class="verificator__error" />
          </div>

          <div class="verificator__button-group">
            <Button
                type="submit"
                class="verificator__button verificator__button--submit"
                text="Enviar"
            />
            <Button
                :text="requestCodeButtonTimer > 0 ? `Solicitar código (${requestCodeButtonTimer}s)` : 'Solicitar código'"
                :disabled="isRequestCodeButtonDisabled"
                class="verificator__button verificator__button--request"
                @click="sendEmail"
            />
          </div>
        </Form>
      </section>
    </main>
  </div>

</template>

<style scoped lang="sass">
@use '@/sass/pages/emailVerificator'
</style>