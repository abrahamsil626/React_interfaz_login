export const PASSWORD_MIN_LENGTH = 8;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const ok = () => ({ valid: true, message: '' });
const fail = (message) => ({ valid: false, message });

export function validateEmail(email) {
  const value = (email ?? '').trim();
  if (!value) return fail('El correo es obligatorio');
  if (!EMAIL_REGEX.test(value)) return fail('Ingresa un correo válido');
  return ok();
}

export function validatePassword(password) {
  const value = password ?? '';
  if (!value) return fail('La contraseña es obligatoria');
  if (value.length < PASSWORD_MIN_LENGTH) {
    return fail(`La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres`);
  }
  return ok();
}

export function validateLoginForm({ email, password }) {
  const emailResult = validateEmail(email);
  const passwordResult = validatePassword(password);
  return {
    valid: emailResult.valid && passwordResult.valid,
    errors: {
      email: emailResult.message,
      password: passwordResult.message,
    },
  };
}
