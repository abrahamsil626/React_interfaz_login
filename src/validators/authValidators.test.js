import { describe, it, expect } from 'vitest';
import { validateEmail, validatePassword, validateLoginForm } from './authValidators';

describe('validateEmail', () => {
  it('CA-01: rechaza correo vacío', () => {
    expect(validateEmail('')).toEqual({ valid: false, message: 'El correo es obligatorio' });
    expect(validateEmail('   ').message).toBe('El correo es obligatorio');
  });

  it.each(['abc', 'a@b', 'a@b.', '@b.com', 'a b@c.com'])('CA-02: rechaza "%s"', (value) => {
    expect(validateEmail(value)).toEqual({ valid: false, message: 'Ingresa un correo válido' });
  });

  it('CA-03: acepta correo válido', () => {
    expect(validateEmail('demo@correo.com')).toEqual({ valid: true, message: '' });
  });
});

describe('validatePassword', () => {
  it('CA-04: rechaza contraseña vacía', () => {
    expect(validatePassword('')).toEqual({ valid: false, message: 'La contraseña es obligatoria' });
  });

  it('CA-05: rechaza contraseña corta', () => {
    expect(validatePassword('1234567')).toEqual({
      valid: false,
      message: 'La contraseña debe tener al menos 8 caracteres',
    });
  });

  it('CA-06: acepta 8 o más caracteres', () => {
    expect(validatePassword('12345678').valid).toBe(true);
  });
});

describe('validateLoginForm', () => {
  it('reúne los errores de ambos campos', () => {
    const result = validateLoginForm({ email: '', password: '123' });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBe('El correo es obligatorio');
    expect(result.errors.password).toContain('al menos 8');
  });

  it('es válido con datos correctos', () => {
    expect(validateLoginForm({ email: 'a@b.co', password: '12345678' }).valid).toBe(true);
  });
});
