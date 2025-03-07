<script>
import {Form, Field, ErrorMessage} from "vee-validate";
import Button from "@/components/Button.vue";
import { useRouter } from "vue-router";
import * as yup from "yup";
import axios from "axios";
import router from "@/router/index.js";

const urlBackend = import.meta.env.VITE_BACKEND_URL;

export default {
  name: "LoginForm",
  components: {ErrorMessage, Button, Field, Form },
  setup() {

    const router = useRouter();
    const schema = yup.object().shape({
      email: yup.string().
      required("contraseña incorrecta")
          .matches(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm),
      password: yup.string()
          .required("Ingrese la contraseña")
          .min(8),
    })
    return { schema };
  },
  methods:{
    async onSubmit (values, { setErrors })  { // Make onSubmit async and add setErrors
      try {
        await axios.post(`${urlBackend}/auth/login`, values,{ withCredentials: true }); // Replace with your backend API endpoint
        await router.push("/2fa"); // Redirect on success
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else if (error.response && error.response.data && error.response.data.message) {
          setErrors({general: error.response.data.message})
        }
        else {
          console.error("Login failed:", error);
          setErrors({ general: "Error de inicio de sesión. Inténtelo de nuevo." }); // Generic error message
        }
      }
    }
  }
};
</script>

<template>
  <Form @submit="onSubmit"  :validation-schema="schema">
    <Field name="email" />
    <ErrorMessage name="email" />

    <Field name="password" type="password" />
    <ErrorMessage name="password" />

    <Button type="submit" text="Acceder" />
  </Form>
</template>

<style scoped>

</style>