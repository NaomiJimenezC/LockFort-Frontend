<script>
import Button from "@/components/Button.vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
import axios from "axios";
import router from "@/router/index.js";
import { useAuthStore } from "@/storage/authStorage";

const urlBackend = import.meta.env.VITE_BACKEND_URL;

export default {
  name: "Authenticator2faVerification",
  components: { ErrorMessage, Field, Form, Button },
  data() {
    return {
      qrCodeDataUri: '',
      loadingQrCode: true,
      qrCodeError: null,
      schema: yup.object().shape({
        code: yup.string()
          .required("Código requerido")
          .matches(/^[0-9]{6}$/, "El código debe ser de 6 dígitos numéricos"),
      }),
      authStore: useAuthStore() // Move authStore to data for Options API
    };
  },
  methods: {
    async onSubmit(values, actions) {
      if (!actions.errors) {
        try {
          const response = await axios.post(`${urlBackend}/auth/2fa/verify`, values, { withCredentials: true, withXSRFToken: true });
          if (response.status === 200) {
            this.authStore.login(response.data.user);
            await router.push("/vault");
          }

          console.log("Verification successful", response);

        } catch (error) {

          console.error("Verification failed", error);
          if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
          } else {
            alert("Error verifying code. Please try again.");
          }
        }
      }
    },
    async setUpQr() {
      this.loadingQrCode = true;
      this.qrCodeError = null;
      try {
        const response = await axios.post(`${urlBackend}/auth/2fa/setup`, { 'two_factor_type': 'app' }, { withCredentials: true, withXSRFToken: true });
        this.qrCodeDataUri = `data:image/png;base64,${response.data.qr_code_url}`;
      } catch (error) {

        this.qrCodeError = "Failed to generate QR code. Please try again later.";
      } finally {
        this.loadingQrCode = false;
      }
    },
  },
  mounted() {
    this.setUpQr();
  },
};
</script>

<template>
  <section>
    <h1>Configura tu Authenticator App</h1>
    <p>Escanea el código QR con tu aplicación de autenticación (Google Authenticator, Authy, etc.) para generar códigos de verificación.</p>
  </section>

  <section v-if="loadingQrCode">
    <p>Cargando código QR...</p>
  </section>

  <section v-else-if="qrCodeError">
    <p class="error-message">{{ qrCodeError }}</p>
    <Button text="Reintentar Cargar QR" @click="setUpQr" />
  </section>

  <section v-else-if="qrCodeDataUri">
    <img :src="qrCodeDataUri" alt="Código QR para Authenticator App" />
    <p>Escanea este código QR con tu Authenticator App.</p>

    <Form @submit="onSubmit" :validation-schema="schema">
      <label for="code">Código de Verificación</label>
      <Field
        type="text"
        id="code"
        name="code"
        placeholder="Introduce el código de 6 dígitos"
      />
      <ErrorMessage name="code" class="error-message" />
      <Button type="submit" text="Verificar Código" />
    </Form>
  </section>
</template>

<style scoped>
.error-message {
  color: red;
  margin-top: 5px;
}
</style>