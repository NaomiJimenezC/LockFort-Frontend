<template>
  <div class="form">
    <h2 class="form__title">Editar Credencial</h2>

    <Form
        v-if="credential"
        :initial-values="initialValuesWithoutProfilePhoto"
        :validation-schema="schema"
        @submit="onSubmit"
        :key="credential.id"
        class="form__content"
    >
      <div class="form__group">
        <label class="form__label" for="username">Nombre de usuario</label>
        <Field
            class="form__input"
            name="username"
            type="text"
            id="username"
            placeholder="Ingresa el nombre de usuario"
        />
        <ErrorMessage name="username" class="form__error" />
      </div>

      <div class="form__group">
        <label class="form__label" for="email">Email</label>
        <Field
            class="form__input"
            name="email"
            type="email"
            id="email"
            placeholder="Ingresa el email"
        />
        <ErrorMessage name="email" class="form__error" />
      </div>

      <div class="form__group">
        <label class="form__label" for="birthday">Fecha de Nacimiento</label>
        <Field
            class="form__input"
            name="birthday"
            type="date"
            id="birthday"
        />
        <ErrorMessage name="birthday" class="form__error" />
      </div>

      <div class="form__group">
        <label class="form__label" for="profile_photo">Foto de Perfil</label>
        <input
            class="form__input"
            type="file"
            id="profile_photo"
            @change="handleFileChange"
            accept="image/*"
        />
        <ErrorMessage name="profile_photo" class="form__error" />
      </div>

      <div class="form__group">
        <label class="form__label" for="current_password">Contraseña Actual</label>
        <Field
            class="form__input"
            name="current_password"
            type="password"
            id="current_password"
            placeholder="Ingresa tu contraseña actual"
        />
        <ErrorMessage name="current_password" class="form__error" />
      </div>

      <div class="form__group">
        <label class="form__label" for="new_password">Nueva Contraseña</label>
        <Field
            class="form__input"
            name="new_password"
            type="password"
            id="new_password"
            placeholder="Ingresa la nueva contraseña (opcional)"
        />
        <ErrorMessage name="new_password" class="form__error" />
      </div>

      <div class="form__actions">
        <Button type="submit" class="form__button editor" text="Guardar cambios" >
          Guardar Cambios
        </Button>
      </div>
    </Form>

    <div v-else class="form__loading-message">
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
  /**
   * @vue-component
   * @name EditCredentialForm
   * @description This component provides a form for editing user profile information. It fetches the user data from local storage, pre-fills the form, and allows users to update their username, email, birthday, and profile photo. It also allows changing the password if the user provides the current password. It uses vee-validate for form validation and sends a PUT request to the backend to update the user's information. Upon successful update, it redirects the user to the UserProfile page.
   */
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
  
        if (!formData.current_password && !formData.new_password) {
            delete formData.current_password;
            delete formData.new_password;
        } else if (!formData.new_password) {
            delete formData.new_password;
        }
  
  
        if (this.selectedFile) {
          convertToWebp(this.selectedFile)
            .then(base64 => {
              formData.profile_photo = base64;
              this.updateUser(formData);
            })
            .catch(error => {
              console.error('Error al procesar la imagen:', error);
            });
        } else {
          this.updateUser(formData);
        }
      },
      updateUser(formData) {
          axios.put(
              `${import.meta.env.VITE_BACKEND_URL}/user/update`, // Backend endpoint is /api/updateUser (assumed)
              formData,
              {headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                }}
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
  
  <style scoped lang="sass">
  @use "@/sass/components/form"
  </style>