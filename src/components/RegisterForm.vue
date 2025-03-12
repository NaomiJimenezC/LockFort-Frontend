<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import axios from "axios";
import Button from "@/components/Button.vue";

export default {
  name: "RegisterForm",
  components: { Button, Field, Form, ErrorMessage },
  data() {
    const urlBackend = import.meta.env.VITE_BACKEND_URL;
    const csrf = urlBackend.replace(/\/api$/, '');
    const schema = yup.object().shape({
      username: yup.string().required("El username es obligatorio"),
      birthday: yup.date().required("La fecha de nacimiento es obligatoria"),
      email: yup.string()
        .required("El email es obligatorio")
        .matches(
          /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm,
          "Email no válido"
        ),
      password: yup.string()
        .required("La contraseña es obligatoria")
        .min(8, "La contraseña debe tener al menos 8 caracteres"),
      password_confirmation: yup.string()
        .required("Confirmar contraseña es obligatorio")
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir'),
      terms: yup.boolean()
        .oneOf([true], 'Debes aceptar los términos y condiciones'),
    });
    return {
      schema,
      urlBackend,
      csrf
    };
  },
  methods: {
    async onSubmit(values, { setErrors }) {
      try {
        await axios.get(`${this.csrf}/sanctum/csrf-cookie`, { withCredentials: true });
        await axios.post(`${this.urlBackend}/auth/register`, values, { withCredentials: true, withXSRFToken: true });
        await this.$router.push("/login");
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else if (error.response && error.response.data && error.response.data.message) {
          setErrors({ general: error.response.data.message });
        } else {
          console.error("Registro fallido:", error);
          setErrors({ general: "Error de registro. Inténtelo de nuevo." });
        }
      }
    }
  }
};
</script>

<template>
  <Form @submit="onSubmit" :validation-schema="schema">
    <!-- Mensaje de error general -->
    <ErrorMessage name="general" class="error-message" />

    <div>
      <label for="username">Username</label>
      <Field
        id="username"
        name="username"
        label="Username"
        type="text"
        placeholder="Username"
      />
      <ErrorMessage name="username" class="error-message" />
    </div>

    <div>
      <label for="email">Email</label>
      <Field
        id="email"
        name="email"
        label="Email"
        type="email"
        placeholder="Email"
      />
      <ErrorMessage name="email" class="error-message" />
    </div>

    <div>
      <label for="birthday">Fecha Nacimiento</label>
      <Field
        id="birthday"
        name="birthday"
        label="Fecha Nacimiento"
        type="date"
        placeholder="Fecha Nacimiento"
      />
      <ErrorMessage name="birthday" class="error-message" />
    </div>

    <div>
      <label for="password">Contraseña</label>
      <Field
        id="password"
        name="password"
        label="Contraseña"
        type="password"
        placeholder="Contraseña"
      />
      <ErrorMessage name="password" class="error-message" />
    </div>

    <div>
      <label for="password_confirmation">Confirmar contraseña</label>
      <Field
        id="password_confirmation"
        name="password_confirmation"
        label="Confirmar contraseña"
        type="password"
        placeholder="Confirmar contraseña"
      />
      <ErrorMessage name="password_confirmation" class="error-message" />
    </div>

    <div>
      <Field
        type="checkbox"
        name="terms"
        id="terms"
      />
      <label for="terms" class="inline-label">Acepto los términos y condiciones</label>
      <ErrorMessage name="terms" class="error-message" />
    </div>

    <Button type="submit" text="Registrarte" />
  </Form>
</template>

<style scoped>
.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}
</style>