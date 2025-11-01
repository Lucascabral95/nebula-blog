<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="React Logo" width="180"/>
</p>

# Nebula Blog

## Descripción general

**Nebula Blog** es una aplicación web avanzada de blogging desarrollada con [Next.js](https://nextjs.org/) y TypeScript, diseñada para ofrecer una experiencia completa de creación y gestión de contenido. Este proyecto implementa una arquitectura modular con autenticación robusta, gestión de estado eficiente con Zustand, y una interfaz moderna y responsiva construida con Tailwind CSS y SCSS. La plataforma permite a los usuarios crear publicaciones, interactuar mediante likes y comentarios, gestionar perfiles personalizados y mantener una experiencia de usuario fluida y profesional.

---

## ⚙️ Características Principales

- **Sistema Completo de Blogging**: Creación de publicaciones con título, categoría, slug automático y contenido rico, incluyendo editor de texto avanzado.
- **Gestión de Usuarios Completa**: Registro e inicio de sesión local y con Google mediante NextAuth, perfiles personalizados con información detallada del usuario.
- **Interacciones Sociales**: Sistema de likes en publicaciones y comentarios, comentarios anidados con valoración, y sistema de favoritos para guardar contenido relevante.
- **Búsqueda y Filtrado Avanzado**: Buscador potente que permite filtrar publicaciones por título, autor o categoría, con exploración dinámica de categorías recomendadas.
- **Panel de Usuario Personalizado**: Gestión completa del perfil, historial de publicaciones, favoritos y configuración de cuenta.
- **Editor de Texto Profesional**: Editor de contenido con formato rico, previsualización en tiempo real y herramientas de edición avanzadas.
- **Sistema de Categorías y Etiquetas**: Organización jerárquica del contenido con categorías, etiquetas y sistema de navegación intuitivo.
- **Diseño Responsivo y Moderno**: UI adaptativa con Tailwind CSS, animaciones suaves con Framer Motion y experiencia optimizada para todos los dispositivos.
- **Gestión de Estado Eficiente**: Estado global manejado con Zustand para sincronización de datos en tiempo real y experiencia de usuario fluida.
- **API RESTful Completa**: Endpoints bien estructurados para todas las operaciones CRUD con validación y manejo de errores.
- **Seguridad Robusta**: Protección de rutas, validación de datos, autenticación segura y manejo de sesiones con JWT.
- **Optimización de Performance**: Server-Side Rendering, Image Optimization, lazy loading y caching inteligente.
- **Notificaciones en Tiempo Real**: Sistema de toast notifications para feedback inmediato al usuario.
- **Manejo de Errores Global**: Sistema centralizado de manejo de errores con mensajes contextualizados.

## 🧪 Testing

El proyecto implementa un sistema completo de testing utilizando **Vitest** y **React Testing Library**, garantizando la calidad y confiabilidad del código.

### Configuración de Testing

- **Framework de Testing**: [Vitest](https://vitest.dev/) - Test runner rápido y moderno
- **Testing Library**: [@testing-library/react](https://testing-library.com/react) - Testing de componentes React
- **Assertions**: [@testing-library/jest-dom](https://github.com/testing-library/jest-dom) - Matchers personalizados
- **User Interactions**: [@testing-library/user-event](https://testing-library.com/docs/user-event/intro) - Simulación de eventos de usuario
- **Environment**: [jsdom](https://github.com/jsdom/jsdom) - Entorno DOM para testing

### Scripts de Testing

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar tests en modo watch
npm run test:watch

# Generar reporte de cobertura
npm run test:coverage
```

### Áreas de Testing Implementadas

- **Componentes de UI**: Testing de renderizado, interacciones y estados
- **Formularios**: Validación de inputs, envío y manejo de errores
- **Autenticación**: Flujos de login, registro y gestión de sesiones
- **API Routes**: Testing de endpoints y respuestas
- **Hooks Personalizados**: Validación de lógica de negocio
- **Utilidades**: Testing de funciones helper y formatters
- **Integración**: Flujos completos de usuario end-to-end

---

## 🚀 Tecnologías Utilizadas

- **Framework Frontend**: [Next.js 14](https://nextjs.org/) con Server-Side Rendering y App Router
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/) para tipado estático y mayor robustez
- **Base de Datos**: [MongoDB](https://www.mongodb.com/) con [Mongoose](https://mongoosejs.com/) para modelado de datos
- **Autenticación**: [NextAuth.js](https://next-auth.js.org/) con soporte para Google OAuth y credenciales locales
- **Gestión de Estado**: [Zustand](https://github.com/pmndrs/zustand) para estado global eficiente
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) y [SCSS](https://sass-lang.com/) para diseño modular
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/) para transiciones suaves
- **HTTP Client**: [Axios](https://axios-http.com/) para comunicación con APIs
- **Notificaciones**: [React Hot Toast](https://react-hot-toast.com/) para feedback visual
- **Iconos**: [React Icons](https://react-icons.github.io/react-icons/) para interfaz enriquecida
- **Loading States**: [React Loading Skeleton](https://github.com/dvtng/react-loading-skeleton) para mejor UX
- **Manejo de Fechas**: [Moment.js](https://momentjs.com/) para gestión de timestamps
- **Seguridad**: [bcrypt](https://www.npmjs.com/package/bcrypt) para hashing de contraseñas
- **Desarrollo**: [ESLint](https://eslint.org/) para calidad de código, [PostCSS](https://postcss.org/) y [Autoprefixer](https://github.com/postcss/autoprefixer)

---

## Tabla de contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Variables de Entorno](#variables-de-entorno)
- [Estructura del proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)
- [Contacto](#contacto)

---

## Instalación

1. **Cloná el repositorio:**

```bash
git clone https://github.com/Lucascabral95/nebula-blog.git
cd nebula-blog
```

2. **Instalá las dependencias:**

```bash
npm install
```

3. **Configurá las variables de entorno:**

```bash
cp .env.example .env.local
```

Editá el archivo `.env.local` con tus credenciales:

```env
# Base de Datos MongoDB
MONGODB_URI=tu_mongodb_connection_string

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_secreto_aqui

# Google OAuth (opcional)
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
```

4. **Iniciá la base de datos:**

Asegurate de tener MongoDB corriendo localmente o configurá la conexión a tu base de datos en la nube.

5. **Compilá y ejecutá el proyecto:**

```bash
npm run dev
```

---

## Uso

### Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:3000`

### Modo Producción

```bash
npm run build
npm start
```

```bash
npm run lint
```

```bash
npm run test
```

### Scripts Disponibles

- `npm run dev` - Iniciá servidor de desarrollo
- `npm run build` - Compilá para producción
- `npm start` - Iniciá servidor de producción
- `npm run lint` - Ejecutá análisis de código con ESLint
- `npm run lint` - Ejecutá el testing de los componentes de toda la aplicación

---

## Variables de Entorno

El proyecto requiere las siguientes variables de entorno en `.env.local`:

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `MONGODB_URI` | String de conexión a MongoDB | ✅ |
| `NEXTAUTH_URL` | URL base de la aplicación | ✅ |
| `NEXTAUTH_SECRET` | Secreto para NextAuth.js | ✅ |
| `GOOGLE_CLIENT_ID` | Client ID de Google OAuth | ❌ |
| `GOOGLE_CLIENT_SECRET` | Client Secret de Google OAuth | ❌ |

---

## Estructura del proyecto

```bash
├── src/
│   ├── app/                          # App Router de Next.js 14
│   │   ├── api/                      # Rutas de API
│   │   │   ├── auth/                 # Endpoints de autenticación
│   │   │   ├── category/             # Gestión de categorías
│   │   │   ├── comment/              # Gestión de comentarios
│   │   │   ├── detalles/             # Detalles de usuarios
│   │   │   ├── post/                 # CRUD de publicaciones
│   │   │   ├── register/             # Registro de usuarios
│   │   │   └── tag/                  # Gestión de etiquetas
│   │   ├── blog/                     # Páginas del blog
│   │   │   ├── escribir-posteo/      # Editor de publicaciones
│   │   │   ├── mi-perfil/            # Perfil de usuario
│   │   │   ├── perfil/               # Perfiles públicos
│   │   │   └── posteo/               # Detalle de publicaciones
│   │   ├── globals.css               # Estilos globales
│   │   ├── layout.js                 # Layout principal
│   │   └── page.jsx                  # Página de inicio
│   │
│   ├── components/                   # Componentes reutilizables
│   │   ├── ConfigData/               # Configuración de datos
│   │   ├── EditorTexto/              # Editor de texto rico
│   │   ├── EstructuraCuerpo/         # Estructura principal
│   │   ├── EstructuraLoginRegister/  # Formularios de auth
│   │   ├── Header/                   # Navegación y header
│   │   ├── ItemComment/              # Componente de comentarios
│   │   ├── Login/                    # Formulario de login
│   │   ├── Register/                 # Formulario de registro
│   │   └── Settings/                 # Configuración de usuario
│   │
│   ├── DAO/                          # Data Access Objects
│   │   ├── categoryDAO.js            # Acceso a categorías
│   │   ├── commentDAO.js             # Acceso a comentarios
│   │   ├── postDAO.js                # Acceso a publicaciones
│   │   ├── tagDAO.js                 # Acceso a etiquetas
│   │   └── userDAO.js                # Acceso a usuarios
│   │
│   ├── infrastructure/               # Configuración y utilidades
│   │   ├── database/                 # Configuración de DB
│   │   ├── middlewares/              # Middlewares personalizados
│   │   ├── validators/               # Validaciones de datos
│   │   └── utils/                    # Funciones utilitarias
│   │
│   ├── models/                       # Modelos de datos
│   │   ├── Category.js               # Modelo de categoría
│   │   ├── Comment.js                # Modelo de comentario
│   │   ├── Post.js                   # Modelo de publicación
│   │   ├── Tag.js                    # Modelo de etiqueta
│   │   └── User.js                   # Modelo de usuario
│   │
│   ├── presentation/                 # Componentes de presentación
│   │   ├── cards/                    # Tarjetas de contenido
│   │   ├── forms/                    # Formularios reutilizables
│   │   └── layouts/                  # Layouts específicos
│   │
│   ├── services/                     # Lógica de negocio
│   │   └── authService.js            # Servicio de autenticación
│   │
│   ├── utils/                        # Utilidades globales
│   │   └── helpers.js                # Funciones helper
│   │
│   ├── zustand.jsx                   # Store de Zustand
│   └── middleware.jsx                # Middleware de Next.js
│
├── public/                           # Assets estáticos
│   ├── fonts/                        # Fuentes personalizadas
│   └── favicon.ico                   # Favicon
│
├── .env.local                        # Variables de entorno (local)
├── .eslintrc.json                    # Configuración de ESLint
├── jsconfig.json                     # Configuración de JavaScript
├── next.config.mjs                   # Configuración de Next.js
├── package.json                      # Dependencias y scripts
├── tailwind.config.ts                # Configuración de Tailwind CSS
├── tsconfig.json                     # Configuración de TypeScript
└── README.md                         # Documentación

```

---

## API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario
- `GET /api/auth/session` - Obtener sesión actual

### Publicaciones
- `GET /api/post` - Obtener todas las publicaciones
- `POST /api/post` - Crear nueva publicación
- `GET /api/post/[id]` - Obtener publicación por ID
- `PUT /api/post/[id]` - Actualizar publicación
- `DELETE /api/post/[id]` - Eliminar publicación

### Comentarios
- `GET /api/comment/[postId]` - Obtener comentarios de una publicación
- `POST /api/comment` - Crear nuevo comentario
- `PUT /api/comment/[id]` - Actualizar comentario
- `DELETE /api/comment/[id]` - Eliminar comentario

### Categorías
- `GET /api/category` - Obtener todas las categorías
- `POST /api/category` - Crear nueva categoría

### Usuarios
- `GET /api/detalles/[id]` - Obtener detalles de usuario
- `PUT /api/detalles/[id]` - Actualizar perfil de usuario

---

## Contribuciones

¡Las contribuciones son bienvenidas! Seguí estos pasos:

1. **Hacé un fork del repositorio.**
2. **Creá una rama para tu feature o fix:**
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. **Realizá tus cambios y escribí pruebas si es necesario.**
4. **Hacé commit y push a tu rama:**
   ```bash
   git commit -m "feat: agrega nueva funcionalidad"
   git push origin feature/nueva-funcionalidad
   ```
5. **Abrí un Pull Request describiendo tus cambios.**

### Guía de Estilo
- Usá TypeScript para todo el código nuevo
- Seguí las convenciones de ESLint
- Escribí mensajes de commit claros y descriptivos
- Agregá pruebas para nuevas funcionalidades

---

## Licencia

Este proyecto está bajo la licencia **MIT**. Podés ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 📬 Contacto

- **Autor:** Lucas Cabral
- **Email:** lucassimple@hotmail.com
- **GitHub:** [https://github.com/Lucascabral95](https://github.com/Lucascabral95)
- **Portfolio:** [https://portfolio-web-dev-git-main-lucascabral95s-projects.vercel.app/](https://portfolio-web-dev-git-main-lucascabral95s-projects.vercel.app/)

---

## 📄 Conclusión

**Nebula Blog** representa una solución completa y profesional para la gestión de contenido web, combinando tecnologías modernas con mejores prácticas de desarrollo. A través de su arquitectura limpia, sistema de autenticación robusto y experiencia de usuario optimizada, este proyecto demuestra capacidad para construir aplicaciones web escalables y mantenibles. La implementación de patrones de diseño modernos, gestión eficiente del estado y atención al detalle en la interfaz reflejan un compromiso con la calidad y la innovación en el desarrollo de software.

---

### 🚀 Despliegue

El proyecto está listo para ser desplegado en plataformas como:
- **Vercel** (recomendado para Next.js)
- **Netlify**
- **Heroku**
- **AWS Amplify**

Para producción, asegurate de configurar todas las variables de entorno correctamente y seguir las mejores prácticas de seguridad.

---

## 🎯 Próximas Mejoras

- [ ] Optimizar SEO con meta tags dinámicos