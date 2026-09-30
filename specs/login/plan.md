# Plan técnico: Login

## Stack
- Vite + React (JavaScript, sin TypeScript)
- MUI (`@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`)
- Vitest + React Testing Library + jsdom

## Decisiones
| Decisión | Razón |
|----------|-------|
| Sesión como estado en el hook `useAuth` (`login` / `loading` / `welcome`) | Solo hay 3 vistas; `react-router` sería excesivo (RF-04). |
| Validadores como funciones puras que devuelven `{ valid, message }` | Fáciles de probar y separados de la UI (RF-03). |
| `authService` lee `users.json` y simula latencia con `setTimeout` | Reemplazable por una API real sin tocar la UI. |
| El tooltip lee el usuario de prueba de `users.json` | Una sola fuente del dato (RF-02). |
| Formulario con `noValidate` | Evita validación nativa HTML; manda el módulo de validadores. |
| Imagen lateral local (`src/assets/login-bg.svg`) | `source.unsplash.com` fue dado de baja. |

## Estructura
```
specs/login/        spec.md, plan.md, tasks.md
docs/flujo-login.mmd
src/
  data/users.json
  validators/authValidators.js
  services/authService.js
  hooks/useAuth.js
  pages/SignInSide.jsx, LoadingScreen.jsx, WelcomeScreen.jsx
  components/Copyright.jsx
  theme.js, App.jsx, main.jsx
  test/setup.js
```

## Verificación
Cada criterio CA-xx se cubre con una prueba (`*.test.js(x)` junto al código).
