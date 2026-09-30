# Interfaz de Login (React + MUI)

Interfaz de inicio de sesión basada en la plantilla *Sign-in side* de Material UI, portada a las versiones actuales de React y MUI. Autentica contra un JSON local, muestra una pantalla de carga y una de bienvenida con opción de salir.

> Es un proyecto de demostración: no tiene backend ni base de datos.

## Stack
- React 19 + Vite (JavaScript)
- MUI (`@mui/material`, `@mui/icons-material`) con Emotion
- Vitest + React Testing Library (pruebas)

## Requisitos
- Node.js 20 o superior y npm

## Instalación y uso
```bash
npm install
npm run dev        # servidor de desarrollo (http://localhost:5173)
npm test           # ejecuta las pruebas una vez
npm run test:watch # pruebas en modo observador
npm run build      # build de producción en dist/
npm run preview    # sirve el build
```

## Datos de prueba
| Campo | Valor |
|-------|-------|
| Correo | `demo@correo.com` |
| Contraseña | `Demo1234` |

También aparecen en el tooltip (ícono ℹ️) de la parte superior del formulario. Los datos viven en `src/data/users.json`.

## Flujo
Ver el diagrama en [`docs/flujo-login.mmd`](docs/flujo-login.mmd) (Mermaid).

1. Se muestra el formulario de login.
2. Se validan correo y contraseña (al salir de cada campo y al enviar).
3. Si son válidos, se muestra la pantalla de carga mientras se verifican las credenciales (~1.5 s simulados).
4. Si no coinciden con el JSON, vuelve al formulario con la alerta "Correo o contraseña incorrectos".
5. Si coinciden, se muestra la pantalla de bienvenida con el botón **Salir**, que regresa al login.

## Experiencia de usuario
- Imagen de fondo de una ciudad (ilustración SVG propia en `src/assets/login-bg.svg`, sin dependencias externas ni problemas de licencia).
- Botón para mostrar/ocultar la contraseña.
- Enlace **Usar datos de prueba** que rellena el formulario.
- El foco va al primer campo con error; los errores se limpian al corregir.
- Alerta animada para credenciales incorrectas y transición suave a la bienvenida.
- Diseño adaptable: en móvil se oculta la imagen y el formulario ocupa toda la pantalla.

## Reglas de validación
Definidas en `src/validators/authValidators.js`, separadas de la interfaz.

| Campo | Regla | Mensaje |
|-------|-------|---------|
| Correo | Obligatorio | El correo es obligatorio |
| Correo | Formato válido | Ingresa un correo válido |
| Contraseña | Obligatoria | La contraseña es obligatoria |
| Contraseña | Mínimo 8 caracteres | La contraseña debe tener al menos 8 caracteres |

El formulario usa `noValidate`, así que no interviene la validación nativa del navegador.

## Estructura
```
specs/login/            spec.md, plan.md, tasks.md (Spec-Driven Development)
docs/flujo-login.mmd    diagrama del flujo
src/
  data/users.json       usuarios de prueba
  validators/           validaciones (funciones puras) y sus pruebas
  services/             authService: autenticación simulada
  hooks/useAuth.js      estado de sesión: login | loading | welcome
  pages/                SignInSide, LoadingScreen, WelcomeScreen
  components/           Copyright
  assets/login-bg.svg   imagen lateral
  theme.js, App.jsx, main.jsx, App.test.jsx
```

## Decisiones de diseño
- **Sin router:** solo hay tres vistas; un estado en `useAuth` basta.
- **Sesión en memoria:** al recargar la página se vuelve al login.
- **`authService` reemplazable:** para usar una API real basta con cambiar `authenticate`; la interfaz no se toca.
- **Imagen local:** la plantilla original usaba `source.unsplash.com`, servicio ya dado de baja. Se reemplazó por una ilustración propia.

## Desarrollo guiado por especificación (SDD)
La especificación en `specs/login/` es la fuente de verdad. Cada criterio de aceptación (CA-xx) tiene al menos una prueba. Ante un cambio de comportamiento, se actualiza primero `spec.md`, luego `plan.md`/`tasks.md` y después el código.

## Limitaciones de seguridad
Las credenciales en texto plano dentro del frontend solo sirven para pruebas. En producción la autenticación debe hacerla un backend, con contraseñas con hash y sesiones/tokens.

## Próximos pasos posibles
Backend real, persistencia de sesión, rutas protegidas, recuperación de contraseña y registro.

