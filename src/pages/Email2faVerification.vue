<script>
import Button from "@/components/Button.vue";
import {ErrorMessage, Field, Form} from "vee-validate";
import * as yup from "yup";
import axios from "axios";

const urlBackend = import.meta.env.VITE_BACKEND_URL;

export default {
  name: "Email2faVerification",
  components: {ErrorMessage, Field,Form, Button},
  methods: {
    async onSubmit(values, actions) {
      if (!actions.errors) {
        console.log("Datos enviados al backend:", values); // Añade esta línea
        await axios.post(`${urlBackend}/auth/2fa/verify`,values,{withCredentials: true});
      }
    },
     async sendEmail () {
      const response = await axios.post(`${urlBackend}/auth/2fa/setup`, {'two_factor_type': 'email'}, {withCredentials: true})
      console.log(response)
    }
  },
   setup() {
    const schema = yup.object().shape({
      code: yup.string()
          .required("Código requerido")
          .matches(/^[0-9]{6}$/, "El código debe ser de 6 dígitos numéricos"),
    });
    return {schema};
  },
  mounted() {
    this.sendEmail();
  }

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
      <Button text="Solicitar código"/>
    </Form>

  </section>
</template>

<style scoped>

</style>