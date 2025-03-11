<template>
  <div class="new-credential">
    <h2>Editar Credencial</h2>
    <Form
        v-if="credential"
        :initial-values="initialValuesWithoutWebPhoto"
        :validation-schema="schema"
        @submit="onSubmit"
        :key="credential.id"
    >
      <div class="form-group">
        <label for="title">Título</label>
        <Field name="title" type="text" id="title" placeholder="Ingresa el título" />
        <ErrorMessage name="title" class="error-message" />
      </div>

      <div class="form-group">
        <label for="encrypted_username">Usuario</label>
        <Field name="encrypted_username" type="text" id="encrypted_username" placeholder="Ingresa el usuario" />
        <ErrorMessage name="encrypted_username" class="error-message" />
      </div>

      <div class="form-group">
        <label for="encrypted_password">Contraseña</label>
        <Field name="encrypted_password" type="password" id="encrypted_password" placeholder="Ingresa la contraseña" />
        <ErrorMessage name="encrypted_password" class="error-message" />
      </div>

      <div class="form-group">
        <label for="encrypted_url">URL</label>
        <Field name="encrypted_url" type="text" id="encrypted_url" placeholder="Ingresa la URL" />
        <ErrorMessage name="encrypted_url" class="error-message" />
      </div>

      <div class="form-group">
        <label for="encrypted_notes">Notas (opcional)</label>
        <Field name="encrypted_notes" as="textarea" id="encrypted_notes" placeholder="Ingresa notas adicionales (opcional)" />
        <ErrorMessage name="encrypted_notes" class="error-message" />
      </div>

      <div class="form-group">
        <label for="web_photo">
          Imagen (opcional, máximo 2MB, formatos permitidos: jpg, png)
        </label>
        <input
            type="file"
            id="web_photo"
            name="web_photo"
            accept="image/jpeg,image/png"
            @change="handleFileChange"
        />
        <ErrorMessage name="web_photo" class="error-message" />
      </div>

      <button type="submit">Editar Credencial</button>
    </Form>
    <div v-else class="loading-message">
      ⏳ Cargando información de la credencial...
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import axios from 'axios';
import router from '@/router/index.js';
import {convertToWebp} from "@/helpers/imagesHelper.js";

export default {
  name: 'EditCredentialForm',
  components: {
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
      if (!this.credential) return {}; // Return empty object if credential is null

      const { web_photo, ...restOfCredential } = this.credential;
      return restOfCredential;
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
            { withCredentials: true }
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
    onSubmit(values) {
      const formData = { ...values };
      delete formData.web_photo; // Remove web_photo from formData initially

      console.log('onSubmit called, selectedFile:', this.selectedFile); // Debug: Check selectedFile value

      if (this.selectedFile) {
        convertToWebp(this.selectedFile)
            .then(base64 => {
              formData.web_photo = base64; // Add web_photo only if conversion is successful
              console.log('convertToWebp success, formData with web_photo:', formData); // Debug: Check formData before PUT

              axios.put(
                  `${import.meta.env.VITE_BACKEND_URL}/credentials/${this.id}`,
                  formData,
                  { withCredentials: true, withXSRFToken: true }
              ).then(() => {
                router.push({ name: 'Vault' });
              }).catch(error => {
                console.error('Error al actualizar la credencial:', error);
              });
            })
            .catch(error => {
              console.error('Error al procesar la imagen:', error);
            });
      } else {
        console.log('No new file selected, formData without web_photo:', formData); // Debug: Check formData before PUT (no image)
        axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/credentials/${this.id}`,
            formData,
            { withCredentials: true, withXSRFToken: true }
        ).then(() => {
          router.push({ name: 'Vault' });
        }).catch(error => {
          console.error('Error al actualizar la credencial (sin imagen):', error);
        });
      }
    }
  }
};
</script>

<style scoped>
.new-credential {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="password"],
textarea,
input[type="file"] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #2D3748;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #1a202c;
}

.error-message {
  color: red;
  font-size: 0.9em;
  margin-top: 5px;
}
.loading-message {
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
}
</style>