<template>
  <div class="new-credential">
    <h2>Nueva Credencial</h2>
    <Form :validation-schema="schema" @submit="onSubmit">
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

      <button type="submit">Crear Credencial</button>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import axios from "axios";
import router from "@/router/index.js";

const urlBackend = import.meta.env.VITE_BACKEND_URL;

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
    convertToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    onSubmit(values) {
      const formData = { ...values };
      if (this.selectedFile) {
        this.convertToBase64(this.selectedFile)
            .then(base64 => {
              formData.web_photo = base64;
              console.log('Datos a enviar:', formData);
              axios.post(`${urlBackend}/credentials`,formData,{ withCredentials: true, withXSRFToken: true })
              router.push({ name: 'Vault' })
            })
            .catch(error => {
              console.error('Error al procesar la imagen:', error);
            });
      } else {
          console.log('Datos a enviar:', formData);
        axios.post(`${urlBackend}/credentials`,formData,{ withCredentials: true, withXSRFToken: true })
        router.push({ name: 'Vault' })
      }
    },
  },
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
</style>