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
          <label for="username">Username</label>
          <Field name="username" type="text" id="username" placeholder="Ingresa el título" />
          <ErrorMessage name="title" class="error-message" />
        </div>
  
        <div class="form-group">
          <label for="email">Email</label>
          <Field name="email" type="text" id="email" placeholder="Ingresa el usuario" />
          <ErrorMessage name="email" class="error-message" />
        </div>
  
        
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
          username: yup.string().required('El título es requerido'),
          email: yup
        .string()
        .required("contraseña incorrecta")
        .matches(
          /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm
        ),
                }),
        selectedFile: null
      };
    },
    computed: {
      initialValuesWithoutWebPhoto() {
        if (!this.credential) return {}; 
  
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
          const userData = localStorage.getItem('auth')
          if (userData) {
            this.credential = userData;
          } else {
            throw new Error('La credencial no existe');
          }
        } catch (err) {
          console.error('Error al obtener la credencial:', err);
        }
      },
      onSubmit(values) {
        const formData = { ...values };
  
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