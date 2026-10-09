import { useRef, useState } from 'react';
import { InfoIcon, VisibilityIcon, VisibilityOffIcon } from '../components/Icons';
import { getTestUser } from '../services/authService';
import { validateEmail, validatePassword, validateLoginForm } from '../validators/authValidators';

const testUser = getTestUser();

export default function SignIn({ onSubmit, onInput, authError = '', hidden = false }) {
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Al corregir un campo, su error desaparece; se vuelve a validar al salir del campo.
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    onInput?.();
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const validate = name === 'email' ? validateEmail : validatePassword;
    setErrors((prev) => ({ ...prev, [name]: validate(value).message }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = validateLoginForm(values);
    setErrors(result.errors);
    if (!result.valid) {
      // Lleva el foco al primer campo con error.
      (result.errors.email ? emailRef : passwordRef).current?.focus();
      return;
    }
    onSubmit(values.email, values.password);
  };

  const fillTestUser = () => {
    setValues({ email: testUser.email, password: testUser.password });
    setErrors({ email: '', password: '' });
    onInput?.();
  };

  return (
    <form
      className={`form${hidden ? ' is-hidden' : ''}`}
      noValidate
      inert={hidden}
      onSubmit={handleSubmit}
    >
      <div
        className="hint"
        onMouseEnter={() => setShowHint(true)}
        onMouseLeave={() => setShowHint(false)}
      >
        <button
          type="button"
          className="icon-button"
          aria-label="Ver datos de prueba"
          aria-describedby={showHint ? 'test-user-hint' : undefined}
          onFocus={() => setShowHint(true)}
          onBlur={() => setShowHint(false)}
          onClick={() => setShowHint(true)}
          onKeyDown={(event) => event.key === 'Escape' && setShowHint(false)}
        >
          <InfoIcon />
        </button>
        {showHint && (
          <div className="tooltip" role="tooltip" id="test-user-hint">
            <span>Datos de prueba</span>
            <span>Correo: {testUser.email}</span>
            <span>Contraseña: {testUser.password}</span>
          </div>
        )}
      </div>

      {authError && (
        <p className="alert" role="alert">
          {authError}
        </p>
      )}

      <div className="field">
        <label className="sr-only" htmlFor="email">
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Correo electrónico"
          autoComplete="email"
          autoFocus
          ref={emailRef}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p className="field-error" id="email-error">
            {errors.email}
          </p>
        )}
      </div>

      <div className="field field--with-toggle">
        <label className="sr-only" htmlFor="password">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Contraseña"
          autoComplete="current-password"
          ref={passwordRef}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? 'password-error' : undefined}
        />
        <button
          type="button"
          className="icon-button"
          aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          onClick={() => setShowPassword((prev) => !prev)}
          onMouseDown={(event) => event.preventDefault()}
        >
          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </button>
        {errors.password && (
          <p className="field-error" id="password-error">
            {errors.password}
          </p>
        )}
      </div>

      <button type="submit" className="btn" disabled={hidden}>
        Iniciar sesión
      </button>
      <button type="button" className="link-button" onClick={fillTestUser} disabled={hidden}>
        Usar datos de prueba
      </button>
    </form>
  );
}
