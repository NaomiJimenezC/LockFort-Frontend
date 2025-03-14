<template>
  <div class="form new-credential">
    <h2 class="form__title">Editar Credencial</h2>

    <Form
        v-if="credential"
        :initial-values="initialValuesWithoutWebPhoto"
        :validation-schema="schema"
        @submit="onSubmit"
        :key="credential.id"
        class="form__content"
    >
      <div class="form__group">
        <label class="form__label" for="title">Título</label>
        <Field
            class="form__input"
            name="title"
            type="text"
            id="title"
            placeholder="Ingresa el título"
        />
        <ErrorMessage name="title" class="form__error" />
      </div>

      <div class="form__group">
        <label class="form__label" for="encrypted_username">Usuario</label>
        <Field
            class="form__input"
            name="encrypted_username"
            type="text"
            id="encrypted_username"
            placeholder="Ingresa el usuario"
        />
        <ErrorMessage name="encrypted_username" class="form__error" />
      </div>

      <div class="form__group">
        <label class="form__label" for="encrypted_password">Contraseña</label>
        <Field
            class="form__input"
            name="encrypted_password"
            type="password"
            id="encrypted_password"
            placeholder="Ingresa la contraseña"
        />
        <ErrorMessage name="encrypted_password" class="form__error" />
      </div>

      <div class="form__group">
        <label class="form__label" for="encrypted_url">URL</label>
        <Field
            class="form__input"
            name="encrypted_url"
            type="text"
            id="encrypted_url"
            placeholder="Ingresa la URL"
        />
        <ErrorMessage name="encrypted_url" class="form__error" />
      </div>

      <div class="form__group">
        <label class="form__label" for="encrypted_notes">Notas (opcional)</label>
        <Field
            class="form__input"
            name="encrypted_notes"
            as="textarea"
            id="encrypted_notes"
            placeholder="Ingresa notas adicionales (opcional)"
        />
        <ErrorMessage name="encrypted_notes" class="form__error" />
      </div>

      <div class="form__group">
        <label class="form__label" for="web_photo">
          Imagen (opcional, máximo 2MB, formatos permitidos: jpg, png)
        </label>
        <input
            class="form__input"
            type="file"
            id="web_photo"
            name="web_photo"
            accept="image/jpeg,image/png"
            @change="handleFileChange"
        />
        <ErrorMessage name="web_photo" class="form__error" />
      </div>

      <div class="form__actions">
        <Button type="submit" class="form__button editor" text=" Editar Credencial">
          Editar Credencial
        </Button>
      </div>
    </Form>

    <div v-else class="form__loading-message">
      ⏳ Cargando información de la credencial...
    </div>
  </div>
</template>

<script>
import {ErrorMessage, Field, Form} from 'vee-validate';
import * as yup from 'yup';
import axios from 'axios';
import router from '@/router/index.js';
import {convertToWebp} from '@/helpers/imagesHelper.js';
import Button from "@/components/Button.vue";
/**
 * @vue-component
 * @name EditCredentialForm
 * @description This component provides a form for editing an existing credential. It fetches the credential details based on the route parameter, pre-fills the form, and allows users to update the title, username, password, URL, notes, and optionally update the image. It uses vee-validate for form validation and sends a PUT request to the backend to update the credential. Upon successful update, it redirects the user to the Vault page.
 */
export default {
  name: 'EditCredentialForm',
  components: {
    Button,
    Form,
    Field,
    ErrorMessage
  },
  data() {
    return {
      credential: null,
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
            )
      }),
      selectedFile: null
    };
  },
  computed: {
    initialValuesWithoutWebPhoto() {
      if (!this.credential) return {};
      const { web_photo, ...rest } = this.credential;
      return rest;
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.fetchCredential();
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async fetchCredential() {
      try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/credentials/${this.id}`,
            {headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }}
        );
        if (response.data) {
          this.credential = response.data;
        } else {
          throw new Error('La credencial no existe');
        }
      } catch (err) {
        console.error('Error al obtener la credencial:', err);
      }
    },
    async onSubmit(values) {
      const formData = { ...values };

      if (this.selectedFile) {
        try {
          formData.web_photo = await convertToWebp(this.selectedFile);
        } catch (error) {
          console.error('Error al procesar la imagen:', error);
          return; // Detener el proceso si hay error en la conversión
        }
      }

      axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/credentials/${this.id}`,
          formData,
          {headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }}
      ).then(() => {
        router.push({ name: 'Vault' });
      }).catch(error => {
        console.error('Error al actualizar la credencial:', error);
      });
    }
  }
};
</script>

<style scoped lang="sass">
@use '@/sass/components/form'
</style>
