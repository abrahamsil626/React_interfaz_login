# Plan técnico: Login

## Stack
- Vite + React (JavaScript, sin TypeScript)
- CSS propio (`src/styles.css`), sin librería de componentes
- Vitest + React Testing Library + jsdom

## Decisiones
| Decisión | Razón |
|----------|-------|
| Sesión como estado en el hook `useAuth` (`login` / `loading` / `welcome`) | Solo hay 3 vistas; `react-router` sería excesivo (RF-04). |
| Validadores como funciones puras que devuelven `{ valid, message }` | Fáciles de probar y separados de la UI (RF-03). |
| `authService` lee `users.json` y simula latencia con `setTimeout` | Reemplazable por una API real sin tocar la UI. |
| El tooltip lee el usuario de prueba de `users.json` | Una sola fuente del dato (RF-02). |
| Formulario con `noValidate` | Evita validación nativa HTML; manda el módulo de validadores. |
| Diseño del pen *Calm breeze login screen* en CSS propio, sin MUI | El diseño son una franja, dos campos y un botón; una librería de componentes sobra (RF-08). |
| Animaciones con clases CSS según el estado de `useAuth`, sin jQuery | El pen usaba jQuery para desvanecer el formulario y bajar el título; el estado de React ya lo sabe. |
| El formulario sigue montado (oculto e `inert`) durante la carga y la bienvenida | La franja conserva su alto y el título puede deslizarse sin saltos; al salir se remonta con una `key` nueva para vaciarlo (CA-11). |
| Etiquetas solo para lectores de pantalla + `placeholder` visible | Respeta el aspecto del pen sin perder accesibilidad. |
| Texto verde más oscuro (`#2e8b7f`) sobre blanco | El `#53e3a6` del pen apenas se lee sobre blanco. |

## Estructura
```
specs/login/        spec.md, plan.md, tasks.md
docs/flujo-login.mmd
src/
  data/users.json
  validators/authValidators.js
  services/authService.js
  hooks/useAuth.js
  pages/SignIn.jsx, LoadingScreen.jsx, WelcomeScreen.jsx
  components/Bubbles.jsx, Copyright.jsx, Icons.jsx
  styles.css, App.jsx, main.jsx
  test/setup.js
```

## Verificación
Cada criterio CA-xx se cubre con una prueba (`*.test.js(x)` junto al código).
