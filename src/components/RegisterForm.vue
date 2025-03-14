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
        await axios.post(`${this.urlBackend}/auth/register`, values);
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
  <Form
      @submit="onSubmit"
      :validation-schema="schema"
      class="form"
  >
    <!-- Mensaje de error general -->
    <ErrorMessage name="general" class="form__error" />

    <div class="form__group">
      <label for="username" class="form__label">Username</label>
      <Field
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          class="form__input"
      />
      <ErrorMessage name="username" class="form__error" />
    </div>

    <div class="form__group">
      <label for="email" class="form__label">Email</label>
      <Field
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          class="form__input"
      />
      <ErrorMessage name="email" class="form__error" />
    </div>

    <div class="form__group">
      <label for="birthday" class="form__label">Fecha Nacimiento</label>
      <Field
          id="birthday"
          name="birthday"
          type="date"
          class="form__input"
      />
      <ErrorMessage name="birthday" class="form__error" />
    </div>

    <div class="form__group">
      <label for="password" class="form__label">Contraseña</label>
      <Field
          id="password"
          name="password"
          type="password"
          placeholder="Contraseña"
          class="form__input"
      />
      <ErrorMessage name="password" class="form__error" />
    </div>

    <div class="form__group">
      <label for="password_confirmation" class="form__label">Confirmar contraseña</label>
      <Field
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          placeholder="Confirmar contraseña"
          class="form__input"
      />
      <ErrorMessage name="password_confirmation" class="form__error" />
    </div>

    <div class="form__group form__group--inline">
      <Field
          type="checkbox"
          name="terms"
          id="terms"
          class="form__checkbox"
      />
      <label for="terms" class="form__label form__label--inline">
        Acepto los términos y condiciones
      </label>
      <ErrorMessage name="terms" class="form__error" />
    </div>

    <div class="form__actions">
      <Button
          type="submit"
          text="Registrarte"
          class="form__button"
      />
    </div>
  </Form>
</template>


<style scoped lang="sass">
@use "@/sass/components/form"

</style>