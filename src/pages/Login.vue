<script>
import {Form, Field, ErrorMessage} from "vee-validate";
import Button from "@/components/Button.vue";
import { useRouter } from "vue-router";
import * as yup from "yup";
import axios from "axios";

export default {
  name: "Login",
  components: {ErrorMessage, Button, Field, Form },
  setup() {
    const urlBackend = import.meta.env.VITE_BACKEND_URL;

    const router = useRouter();
    const onSubmit = async (values, { setErrors }) => { // Make onSubmit async and add setErrors
      try {
        const response = await axios.post(`${urlBackend}/auth/login`, values); // Replace with your backend API endpoint
        console.log(response.data); // Handle successful response
        await router.push("/2fa"); // Redirect on success
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          // Handle specific backend validation errors
          setErrors(error.response.data.errors);
        } else if (error.response && error.response.data && error.response.data.message) {
          //Handles errors from the backend that are not validation errors.
          setErrors({general: error.response.data.message})
        }
        else {
          console.error("Login failed:", error);
          setErrors({ general: "Error de inicio de sesión. Inténtelo de nuevo." }); // Generic error message
        }
      }
    };
    const schema = yup.object().shape({
      email: yup.string().
              required("contraseña incorrecta")
              .matches(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm),
      password: yup.string()
                .required("Ingrese la contraseña")
                .min(8),
    })

    return { onSubmit,schema };
  },
};
</script>

<template>
  <section>
    <h1>Inicio de sesión</h1>
  </section>
  <section>
    <Form @submit="onSubmit" action="post" :validation-schema="schema">
      <Field name="email" />
      <ErrorMessage name="email" />

      <Field name="password" type="password" />
      <ErrorMessage name="password" />

      <Button type="submit" text="Acceder" />
    </Form>
  </section>
</template>
