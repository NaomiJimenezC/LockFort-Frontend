<template>
  <div class="new-credential">
    <Form :validation-schema="schema" @submit="onSubmit" class="form">
      <div class="form__group">
        <label for="title" class="form__label">Título</label>
        <Field name="title" type="text" id="title" placeholder="Ingresa el título" class="form__input" />
        <ErrorMessage name="title" class="form__error" />
      </div>

      <div class="form__group">
        <label for="encrypted_username" class="form__label">Usuario</label>
        <Field name="encrypted_username" type="text" id="encrypted_username" placeholder="Ingresa el usuario" class="form__input" />
        <ErrorMessage name="encrypted_username" class="form__error" />
      </div>

      <div class="form__group">
        <label for="encrypted_password" class="form__label">Contraseña</label>
        <Field name="encrypted_password" type="password" id="encrypted_password" placeholder="Ingresa la contraseña" class="form__input" />
        <ErrorMessage name="encrypted_password" class="form__error" />
      </div>

      <div class="form__group">
        <label for="encrypted_url" class="form__label">URL</label>
        <Field name="encrypted_url" type="text" id="encrypted_url" placeholder="Ingresa la URL" class="form__input" />
        <ErrorMessage name="encrypted_url" class="form__error" />
      </div>

      <div class="form__group">
        <label for="encrypted_notes" class="form__label">Notas (opcional)</label>
        <Field
            name="encrypted_notes"
            as="textarea"
            id="encrypted_notes"
            placeholder="Ingresa notas adicionales (opcional)"
            class="form__input"
        />
        <ErrorMessage name="encrypted_notes" class="form__error" />
      </div>

      <div class="form__group">
        <label for="web_photo" class="form__label">
          Imagen (opcional, máximo 2MB, formatos permitidos: jpg, png)
        </label>
        <input
            type="file"
            id="web_photo"
            name="web_photo"
            accept="image/jpeg,image/png"
            @change="handleFileChange"
            class="form__input"
        />
        <ErrorMessage name="web_photo" class="form__error" />
      </div>

      <div class="form__actions">
        <Button type="submit" class="form__button" text="Crear Credencial">Crear Credencial</Button>
      </div>
    </Form>
  </div>
</template>


<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import axios from "axios";
import router from "@/router/index.js";
import { convertToWebp } from '@/helpers/imagesHelper.js';

const urlBackend = import.meta.env.VITE_BACKEND_URL;
/**
 * @vue-component
 * @name NewCredentialForm
 * @description This component provides a form for creating new credentials. It includes fields for title, username, password, URL, notes, and an optional image upload. It uses vee-validate for form validation and sends a POST request to the backend to save the new credential. Upon successful creation, it redirects the user to the Vault page.
 *
export default {

  name: "NewCredentialForm",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      schema: yup.object({
        title: yup.string().required('El título es requerido'),
        encrypted_username: yup.string().required('El usuario es requerido'),
        encrypted_password: yup.string().required('La contraseña es requerida'),
        encrypted_url: yup.string()
            .required('La URL es requerida')
            .matches(
                /^(https?:\/\/)?([\w\d-]+\.)+[a-z]{2,}(:\d+)?(\/.*)?$/i,
                'El formato de la URL no es válido'
            ),
        encrypted_notes: yup.string().nullable(),
        web_photo: yup
            .mixed()
            .test(
                'fileSize',
                'El archivo es muy grande (máximo 2MB)',
                value => !value || value.size <= 2000000
            )
            .test(
                'fileType',
                'Formato de imagen no soportado, solo se permiten jpg y png',
                value => !value || ['image/jpeg', 'image/png'].includes(value.type)
            ),
      }),
      selectedFile: null, // Para manejar el archivo seleccionado
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    // convertToBase64 function removed

    onSubmit(values) {
      const formData = { ...values };
      if (this.selectedFile) {
        convertToWebp(this.selectedFile) // Usa la función convertToWebp importada
            .then(webpBase64 => {
              formData.web_photo = webpBase64;
              console.log('Datos a enviar:', formData);
              axios.post(`${urlBackend}/credentials`,formData,{headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                }})
              router.push({ name: 'Vault' })
            })
            .catch(error => {
              console.error('Error al procesar la imagen:', error);
            });
      } else {
          console.log('Datos a enviar:', formData);
        axios.post(`${urlBackend}/credentials`,formData,{headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }})
        router.push({ name: 'Vault' })
      }
    },
  },
};
</script>

<style scoped lang="sass">
@use '@/sass/components/form'
</style>