<script>
import { Field, Form } from "vee-validate";
import * as yup from 'yup';
import axios from "axios";
import Button from "@/components/Button.vue";

export default {
  name: "RegisterForm",
  components: { Button, Field, Form },
  data() {
    return {
      schema: yup.object().shape({
        username: yup.string().required(),
        birthday: yup.date().required(),
        email: yup.string()
          .required("Email es obligatorio")
          .matches(
            /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm,
            "Email no válido"
          ),
        password: yup.string()
          .required("Contraseña es obligatoria")
          .min(8, "La contraseña debe tener al menos 8 caracteres"),
        confirmPassword: yup.string()
          .required("Confirmar contraseña es obligatoria")
          .min(8, "La contraseña debe tener al menos 8 caracteres")
          .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir'),
        terms: yup.boolean()
          .required()
          .oneOf([true], 'Debes aceptar los términos y condiciones'),
      })
    };
  },
  methods: {
    async onSubmit(values, { setErrors }) {
      const urlBackend = import.meta.env.VITE_BACKEND_URL;
      const csrf = urlBackend.replace(/\/api$/, '');
      try {
        await axios.get(`${csrf}/sanctum/csrf-cookie`, { withCredentials: true });
        await axios.post(`${urlBackend}/auth/register`, values);
        // Redireccionamos usando this.$router
        this.$router.push("/2fa");
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else if (error.response && error.response.data && error.response.data.message) {
          setErrors({ general: error.response.data.message });
        } else {
          console.error("Login failed:", error);
          setErrors({ general: "Error de inicio de sesión. Inténtelo de nuevo." });
        }
      }
    }
  }
};
</script>

<template>
  <Form @submit="onSubmit">
    <label for="username">Username</label>
    <Field
      id="username"
      name="username"
      label="Username"
      type="text"
      placeholder="Username"
    />

    <label for="email">Email</label>
    <Field
      id="email"
      name="email"
      label="Email"
      type="email"
      placeholder="Email"
    />

    <label for="birthday">Fecha Nacimiento</label>
    <Field
      id="birthday"
      name="birthday"
      label="Fecha Nacimiento"
      type="date"
      placeholder="Fecha Nacimiento"
    />

    <label for="password">Contraseña</label>
    <Field
      id="password"
      name="password"
      label="Contraseña"
      type="password"
      placeholder="Contraseña"
    />

    <label for="password_confirmation">Confirmar contraseña</label>
    <Field
      id="password_confirmation"
      name="password_confirmation"
      label="Confirmar contraseña"
      type="password"
      placeholder="Confirmar contraseña"
    />

    <div>
      <Field
        type="checkbox"
        name="terms"
        id="terms"
      />
      <label for="terms" class="inline-label">Acepto los términos y condiciones</label>
    </div>

    <Button type="submit" text="Registrarte"/>
  </Form>
</template>

<style scoped>
/* Agrega tus estilos aquí si lo requieres */
</style>
