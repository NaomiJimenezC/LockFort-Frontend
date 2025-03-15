# LockFort - Administrador de Credenciales Seguro
LockFort es una aplicación para administrar credenciales de forma segura construida con Vue 3 y Vite. Proporciona a los usuarios una manera segura de almacenar y gestionar sus credenciales de inicio de sesión mientras implementa medidas de seguridad robustas, incluyendo la autenticación de dos factores.

Enlace https://lock-fort.netlify.app/register

## Características

- **Almacenamiento Seguro de Credenciales**: Guarda de forma segura tus nombres de usuario, contraseñas e información relacionada
- **Autenticación de Dos Factores**: Elige entre 2FA basada en correo electrónico o verificación mediante aplicación de autenticación
- **Gestión de Perfil de Usuario**: Actualiza tu información personal y de seguridad
- **Diseño Responsive**: Accede a tus credenciales desde cualquier dispositivo con una interfaz de usuario amigable
- **Validación de Formularios**: Garantiza la exactitud de los datos con una completa validación de formularios
- **Manejo de Imágenes**: Sube y convierte imágenes de perfil e iconos de credenciales
- **Gestión de Estado**: Utiliza Pinia para una gestión eficiente del estado
- **Enrutamiento**: Vue Router para una navegación fluida

## Configuración del Proyecto
### Requisitos Previos

- Node.js (v14 o superior)
- npm (v6 o superior)

### Instalación
```bash
# Clona el repositorio
git clone https://github.com/yourusername/lockfort.git

# Navega al directorio del proyecto
cd lockfort

# Instala las dependencias
npm install

# Copia el archivo de entorno y añade tus configuraciones
cp .env.example .env
```

### Servidor de Desarrollo
```bash
npm run dev
```

Abre tu navegador en `http://localhost:5173` para ver la aplicación.

### Compilación para Producción
```bash
npm run build
```

Esto creará una compilación lista para producción en el directorio `dist`.

## Estructura del Proyecto
```
src/
├── components/          # Componentes UI reutilizables
├── pages/               # Páginas de la aplicación
├── router/              # Configuración de Vue Router
├── sass/                # Estilos Sass y variables
├── storage/             # Almacenes Pinia
├── helpers/             # Funciones auxiliares
├── assets/              # Activos estáticos
├── App.vue              # Componente raíz
└── main.js              # Punto de entrada
```

## Variables de Entorno
Crea un archivo `.env` basado en el proporcionado `.env.example` y añade tu URL del backend:
```
VITE_BACKEND_URL=http://your-backend-url.com/api
```

## Dependencias

- **Vue 3**: Framework principal
- **Vite**: Herramienta de construcción
- **Pinia**: Gestión de estado
- **Vue Router**: Enrutamiento
- **Axios**: Cliente HTTP
- **Vee-validate**: Validación de formularios
- **Yup**: Esquema de validación
- **Feather-icons**: Biblioteca de iconos
- **Font Awesome**: Iconos adicionales
- **Sass**: Estilado

## Uso

1. **Registro**: Crea una nueva cuenta con tu correo electrónico y contraseña deseada
2. **Inicio de Sesión**: Accede a tu cuenta con tus credenciales
3. **Autenticación de Dos Factores**: Elige tu método preferido de 2FA (correo electrónico o aplicación de autenticación)
4. **Gestión de Credenciales**:
    - Crea nuevas credenciales con títulos, nombres de usuario, contraseñas e imágenes opcionales
    - Visualiza y edita credenciales existentes
    - Elimina credenciales cuando ya no sean necesarias
5. **Gestión de Perfil**: Actualiza tu información personal y de seguridad

## Futuras mejoras
- Comprobador de contraseña
- Generador de contraseñas seguras
- Modo oscuro
- Refactorización

## Errores conocidos
- El menú de ordenación de entrada en vault no funciona
- Las fotos de las credenciales no se cambian

## Contribución
Para contribuir a LockFort, por favor sigue estas pautas:

1. Haz un fork del repositorio
2. Crea una nueva rama para tu funcionalidad o corrección
3. Commit tus cambios con mensajes descriptivos
4. Sube tu rama y envía una solicitud de pull

## Licencia
Este proyecto está licenciado bajo Creative Commons

---

LockFort proporciona una manera segura y fácil de usar para gestionar tus credenciales digitales mientras implementa prácticas de seguridad estándar de la industria. Ya sea que estés gestionando cuentas personales o de acceso profesional, LockFort ayuda a mantener tu información segura y organizada.