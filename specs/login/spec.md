# Spec: Login con datos de prueba

## Objetivo
Interfaz de inicio de sesión (con el diseño del pen *Calm breeze login screen* de Lewitje) que autentica contra un JSON local, muestra una pantalla de carga y una pantalla de bienvenida con opción de salir.

## Alcance
- Incluye: formulario, validaciones, autenticación simulada con JSON, carga, bienvenida, salir.
- Excluye: backend real, registro, recuperación de contraseña, rutas, persistencia de sesión.

## Requisitos funcionales

| ID | Requisito |
|----|-----------|
| RF-01 | La pantalla inicial muestra el título "Bienvenido" y el formulario con correo, contraseña y botón "Iniciar sesión". |
| RF-02 | Un tooltip en la parte superior del formulario muestra el correo y la contraseña de prueba, leídos de `users.json`. |
| RF-03 | Las validaciones viven en un módulo aparte (`validators/authValidators.js`), no en el JSX ni en atributos HTML. |
| RF-04 | La sesión vive solo en memoria: recargar la página vuelve al login. |
| RF-05 | Tras un login correcto se muestra una pantalla de carga y luego la de bienvenida. |
| RF-06 | La pantalla de bienvenida es un saludo centrado con el nombre del usuario y un botón "Salir" que regresa al login. |
| RF-07 | Toda la interfaz está en español. |
| RF-08 | El diseño sigue el pen de referencia: franja horizontal con degradado verde centrada sobre fondo **negro**, campos translúcidos centrados y cuadrados animados de fondo. |

## Criterios de aceptación

### Validación de correo
- **CA-01** Dado un correo vacío, al validar, se muestra "El correo es obligatorio".
- **CA-02** Dado un correo sin formato válido (ej. `abc`, `a@b`), se muestra "Ingresa un correo válido".
- **CA-03** Dado un correo con formato válido, no hay error.

### Validación de contraseña
- **CA-04** Dada una contraseña vacía, se muestra "La contraseña es obligatoria".
- **CA-05** Dada una contraseña de menos de 8 caracteres, se muestra "La contraseña debe tener al menos 8 caracteres".
- **CA-06** Dada una contraseña de 8 o más caracteres, no hay error.

### Comportamiento del formulario
- **CA-07** Los errores de cada campo se muestran junto al campo correspondiente (en un globo a su derecha; en pantallas estrechas, en una línea bajo el campo) al enviar y al salir del campo (blur), sin desplazar el resto del formulario en escritorio.
- **CA-08** Si hay errores de validación, no se invoca la autenticación.
- **CA-09** Si el formato es válido pero las credenciales no coinciden con el JSON, se muestra "Correo o contraseña incorrectos" en una alerta.
- **CA-10** Al enviar datos válidos el formulario se desvanece y se muestra la carga (indicador circular) mientras se verifican las credenciales (~1.5 s); si son correctas se pasa a la bienvenida, con el saludo "¡Bienvenido, {nombre}!".
- **CA-11** Al pulsar "Salir" se vuelve al formulario vacío y el título vuelve a ser "Bienvenido".

### Mejoras de UX
- **UX-01** Botón para mostrar/ocultar la contraseña.
- **UX-02** Enlace "Usar datos de prueba" que rellena el formulario.
- **UX-03** Tras un envío inválido, el foco va al primer campo con error.
- **UX-04** El error de un campo desaparece al empezar a corregirlo; la alerta de credenciales se oculta al volver a escribir.
- **UX-05** Los campos se ensanchan y pasan a fondo blanco al recibir el foco.
- **UX-06** Al iniciar sesión, el título se desliza hacia el centro de la franja.
- **UX-07** Las animaciones decorativas se desactivan si el sistema pide reducir el movimiento (`prefers-reduced-motion`).

## Datos de prueba
- Correo: `demo@correo.com`
- Contraseña: `Demo1234`

## Limitaciones conocidas
Las credenciales en texto plano en el frontend son solo para pruebas; en producción la autenticación debe hacerla un backend.


