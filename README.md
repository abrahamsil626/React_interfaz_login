# Interfaz de Login

Interfaz de **inicio de sesión** en React con CSS propio, con una estética serena inspirada en el pen *Calm breeze login screen*: franja de degradado verde sobre fondo negro, campos translúcidos centrados, cuadrados que flotan al fondo y un título que se desliza al entrar.

> **Prueba el proyecto en vivo:** [reactinterfazlogin.netlify.app](https://reactinterfazlogin.netlify.app/)

## Cómo se hizo

1. **Diseño de referencia.** La parte visual parte del pen [*Calm breeze login screen*](https://codepen.io/Lewitje/pen/BNNJjo) de Lewitje, adaptado a React: fondo negro en lugar de blanco, textos en español y la animación de entrada hecha con el estado de React en vez de jQuery.
2. **Especificación.** El login tiene requisitos y criterios de aceptación en [`specs/login/`](specs/login/) (Spec-Driven Development): `spec.md`, `plan.md` y `tasks.md`.
3. **Implementación** en React siguiendo esa spec, con pruebas automáticas por cada criterio de aceptación (CA-xx).
4. **Flujo documentado** en un diagrama Mermaid: [`docs/flujo-login.mmd`](docs/flujo-login.mmd).

> El pen original solo tiene dos campos y un botón; validaciones, mensajes de error, datos de prueba, carga y salida se diseñaron aparte en el mismo estilo.

## Funcionalidad

- Interfaz íntegramente **en español**.
- Formulario de login con validación de correo (obligatorio y con formato válido) y contraseña (obligatoria, mínimo 8 caracteres), al salir de cada campo y al enviar.
- Datos de prueba (`demo@correo.com` / `Demo1234`) visibles en un tooltip y enlace **Usar datos de prueba** que rellena el formulario.
- Botón para mostrar u ocultar la contraseña.
- El foco va al primer campo con error y los errores se limpian al corregir.
- Al enviar, el formulario se desvanece y aparece un indicador de carga mientras se verifican las credenciales (~1.5 s); si no coinciden, vuelve con la alerta animada "Correo o contraseña incorrectos".
- Bienvenida con el nombre del usuario: el título se desliza al centro de la franja y aparece el botón **Salir**, que regresa al login.
- Diseño adaptable (responsive) y animaciones decorativas desactivadas si el sistema pide reducir el movimiento.

> La autenticación es **simulada** en el cliente (JSON local en `src/data/users.json`, sesión solo en memoria); no hay backend ni base de datos.

## Stack

React 19 · Vite · CSS propio (sin librería de componentes) · Vitest + Testing Library.

## Empezar

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve localmente el build |
| `npm test` | Pruebas (criterios de aceptación de la spec) |
| `npm run test:watch` | Pruebas en modo observador |

> Requiere Node.js 20 o superior.

## Estructura

```
specs/        Especificación, plan y tareas (spec-driven)
docs/         Diagrama del flujo de login (Mermaid)
src/
  components/ Bubbles (cuadrados del fondo), Copyright, Icons
  data/       Usuarios de prueba (users.json)
  hooks/      useAuth: estado de sesión (login · loading · welcome)
  pages/      SignIn, LoadingScreen, WelcomeScreen
  services/   authService: autenticación simulada
  validators/ Validaciones (funciones puras) y sus pruebas
  test/       Configuración de pruebas
  styles.css  Estilos de toda la interfaz
```

## Sistema de diseño

Todo el estilo vive en [`src/styles.css`](src/styles.css), con los colores como variables CSS:

- **Color:** franja con degradado de `#50a3a2` a `#53e3a6` sobre fondo negro; texto blanco, y verde oscuro (`#2e8b7f`) sobre las superficies blancas.
- **Forma:** campos y botones de 250 px centrados, con esquinas de 3 px; los campos son translúcidos y al recibir el foco se ensanchan y pasan a blanco.
- **Movimiento:** diez cuadrados translúcidos suben girando en bucle; el formulario se desvanece y el título se desliza al iniciar sesión.
- **Tipografía:** Source Sans Pro en pesos finos (200 y 300), cargada desde Google Fonts.
