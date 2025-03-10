<script>
import {Form, Field, ErrorMessage} from "vee-validate";
import Button from "@/components/Button.vue";
import { useRouter } from "vue-router";
import * as yup from "yup";
import axios from "axios";
import router from "@/router/index.js";

const urlBackend = import.meta.env.VITE_BACKEND_URL;
const csrf = urlBackend.replace(/\/api$/, '');


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
    async onSubmit (values, { setErrors })  {
      try {
        const crsf_token = await axios.get(`${csrf}/sanctum/csrf-cookie`,{withCredentials: true,withXSRFToken:true});

        if (crsf_token.status === 204 || crsf_token.status === 200) {
          await axios.post(`${urlBackend}/auth/login`, values, { withCredentials: true, withXSRFToken: true });
          await router.push("/2fa"); // Redirect on success
        }

      } catch (error) {
        if (error.response) {
          const responseData = error.response.data;
          if (responseData.errors) {
            setErrors(responseData.errors); // Validation errors (e.g., email/password)
          } else if (responseData.message) {
            setErrors({ general: responseData.message }); // General backend error message
          } else {
            setErrors({ general: "Error de inicio de sesión. Por favor, inténtelo de nuevo." }); // Unexpected backend error
            console.error("Login failed - Unexpected response:", responseData);
          }
        } else if (error.request) {
          setErrors({ general: "No se pudo conectar con el servidor. Por favor, inténtelo de nuevo más tarde." }); // Network error
          console.error("Login failed - No response:", error.request);
        } else {
          setErrors({ general: "Error de inicio de sesión. Por favor, inténtelo de nuevo." }); // Request setup error
          console.error("Login failed - Request setup error:", error.message);
        }
        console.error("Full error object:", error); // Log full error for debugging
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