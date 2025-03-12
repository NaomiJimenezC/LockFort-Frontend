<template>
    <div class="new-credential">
      <h2>Editar Credencial</h2>
      <Form
        v-if="credential"
        :initial-values="initialValuesWithoutProfilePhoto"
        :validation-schema="schema"
        @submit="onSubmit"
        :key="credential.id"
      >
        <div class="form-group">
          <label for="username">Username</label>
          <Field name="username" type="text" id="username" placeholder="Ingresa el nombre de usuario" />
          <ErrorMessage name="username" class="error-message" />
        </div>
  
        <div class="form-group">
          <label for="email">Email</label>
          <Field name="email" type="email" id="email" placeholder="Ingresa el email" />
          <ErrorMessage name="email" class="error-message" />
        </div>
  
        <div class="form-group">
          <label for="birthday">Fecha de Nacimiento</label>
          <Field name="birthday" type="date" id="birthday" />
          <ErrorMessage name="birthday" class="error-message" />
        </div>
  
        <div class="form-group">
          <label for="profile_photo">Foto de Perfil</label>
          <input type="file" id="profile_photo" @change="handleFileChange" accept="image/*" />
          <ErrorMessage name="profile_photo" class="error-message" />
        </div>
  
  
        <div class="form-group">
          <label for="current_password">Contraseña Actual</label>
          <Field name="current_password" type="password" id="current_password" placeholder="Ingresa tu contraseña actual" />
          <ErrorMessage name="current_password" class="error-message" />
        </div>
  
        <div class="form-group">
          <label for="new_password">Nueva Contraseña</label>
          <Field name="new_password" type="password" id="new_password" placeholder="Ingresa la nueva contraseña (opcional)" />
          <ErrorMessage name="new_password" class="error-message" />
        </div>
  
        <button type="submit">Guardar Cambios</button>
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
  import { convertToWebp } from "@/helpers/imagesHelper.js";
  
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
          username: yup.string().max(255, 'El nombre de usuario no puede superar los 255 caracteres'),
          email: yup
            .string()
            .email("Email no válido"),
          birthday: yup.date().nullable(),
          profile_photo: yup.string().nullable(),
          current_password: yup.string().when('new_password', {
            is: (new_password) => !!new_password,
            then: yup.string().required('Contraseña actual es requerida para cambiar la contraseña')
          }).nullable(),
          new_password: yup.string()
            .min(8, 'La nueva contraseña debe tener al menos 8 caracteres')
            // Removed password complexity requirements to match backend and simplify for user
            // .matches(
            //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            //   "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial"
            // )
            .nullable(),
        }),
        selectedFile: null
      };
    },
    computed: {
      initialValuesWithoutProfilePhoto() {
        if (!this.credential) return {};
  
        const { profile_photo, ...restOfCredential } = this.credential;
        return restOfCredential;
      }
    },
    created() {
      this.fetchCredential();
    },
    methods: {
      handleFileChange(event) {
        this.selectedFile = event.target.files[0];
      },
      fetchCredential() {
        try {
          const userData = localStorage.getItem('auth')
          if (userData) {
            this.credential = JSON.parse(userData); // Parseamos la cadena JSON a objeto
          } else {
            throw new Error('La credencial no existe');
          }
        } catch (err) {
          console.error('Error al obtener la credencial:', err);
        }
      },
      onSubmit(values) {
        const formData = { ...values };
  
        console.log('onSubmit called, selectedFile:', this.selectedFile);
  
        // Elimina current_password y new_password si ambos están vacíos para evitar enviarlos innecesariamente
        if (!formData.current_password && !formData.new_password) {
            delete formData.current_password;
            delete formData.new_password;
        } else if (!formData.new_password) {
            delete formData.new_password; // Elimina new_password si está vacío pero current_password no
        }
  
  
        if (this.selectedFile) {
          convertToWebp(this.selectedFile)
            .then(base64 => {
              formData.profile_photo = base64; // Backend field name is profile_photo
              console.log('convertToWebp success, formData with profile_photo:', formData);
  
              this.updateUser(formData);
            })
            .catch(error => {
              console.error('Error al procesar la imagen:', error);
            });
        } else {
          console.log('No new file selected, formData without profile_photo:', formData);
          this.updateUser(formData);
        }
      },
      updateUser(formData) {
          axios.put(
              `${import.meta.env.VITE_BACKEND_URL}/api/updateUser`, // Backend endpoint is /api/updateUser (assumed)
              formData,
              { withCredentials: true, withXSRFToken: true }
          ).then(() => {
            router.push({ name: 'UserProfile' }); // Redirige al perfil de usuario tras la edición
          }).catch(error => {
            console.error('Error al actualizar el usuario:', error);
            if (error.response && error.response.status === 401) {
                alert('Contraseña actual incorrecta. Por favor, inténtalo de nuevo.');
            } else {
                alert('Error al actualizar el perfil. Por favor, revisa la consola para más detalles.');
            }
          });
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
  input[type="email"],
  input[type="date"],
  textarea,
  input[type="file"] {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button[type="submit"] {
    background-color: #2D3748;
    color: #fff;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button[type="submit"]:hover {
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