<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import Button from "@/components/Button.vue";
import { useRouter } from "vue-router";
import * as yup from "yup";
import axios from "axios";
import router from "@/router/index.js";

const urlBackend = import.meta.env.VITE_BACKEND_URL;

export default {
  name: "LoginForm",
  components: { ErrorMessage, Button, Field, Form },
  data() {
    const schema = yup.object().shape({
      email: yup
        .string()
        .required("contraseña incorrecta")
        .matches(
          /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm
        ),
      password: yup
        .string()
        .required("Ingrese la contraseña")
        .min(8),
    });
    return {
      schema,
    };
  },
  methods: {
    async onSubmit(values, { setErrors }) {
      try {
          await axios.post(`${urlBackend}/auth/login`, values, {headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }});
          await router.push("/2fa"); // Redirect on success
      } catch (error) {
        if (error.response) {
          const responseData = error.response.data;
          if (responseData.errors) {
            setErrors(responseData.errors); // Validation errors (e.g., email/password)
          } else if (responseData.message) {
            setErrors({ general: responseData.message }); // General backend error message
          } else {
            setErrors({
              general: "Error de inicio de sesión. Por favor, inténtelo de nuevo.",
            }); // Unexpected backend error
            console.error("Login failed - Unexpected response:", responseData);
          }
        } else if (error.request) {
          setErrors({
            general:
              "No se pudo conectar con el servidor. Por favor, inténtelo de nuevo más tarde.",
          }); // Network error
          console.error("Login failed - No response:", error.request);
        } else {
          setErrors({
            general: "Error de inicio de sesión. Por favor, inténtelo de nuevo.",
          }); // Request setup error
          console.error("Login failed - Request setup error:", error.message);
        }
        console.error("Full error object:", error);
      }
    },
  },
};
</script>

<template>
  <Form
      @submit="onSubmit"
      :validation-schema="schema"
      class="form"
  >
    <ErrorMessage name="general" class="form__error" />

    <div class="form__group">
      <label class="form__label" for="email">Correo electrónico</label>
      <Field
          name="email"
          type="email"
          class="form__input"
          placeholder="ejemplo@dominio.com"
      />
      <ErrorMessage name="email" class="form__error" />
    </div>

    <div class="form__group">
      <label class="form__label" for="password">Contraseña</label>
      <Field
          name="password"
          type="password"
          class="form__input"
          placeholder="••••••••"
      />
      <ErrorMessage name="password" class="form__error" />
    </div>

    <div class="form__actions">
      <Button
          type="submit"
          text="Acceder"
          class="form__button button--primary"
      />
    </div>
  </Form>
</template>


<style scoped lang="sass">
 @use "@/sass/components/form"
</style>