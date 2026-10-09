import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { LOGIN_DELAY_MS } from './services/authService';

const fillAndSubmit = async (user, email, password) => {
  if (email) await user.type(screen.getByLabelText(/correo electrónico/i), email);
  if (password) await user.type(screen.getByLabelText('Contraseña'), password);
  await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));
};

afterEach(() => {
  vi.useRealTimers();
});

describe('Flujo de login', () => {
  it('CA-01/CA-04/CA-08: muestra errores de campos vacíos y no autentica', async () => {
    const user = userEvent.setup();
    render(<App />);
    await fillAndSubmit(user);
    expect(screen.getByText('El correo es obligatorio')).toBeInTheDocument();
    expect(screen.getByText('La contraseña es obligatoria')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('CA-07: muestra el error al salir del campo', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText(/correo electrónico/i), 'abc');
    await user.tab();
    expect(screen.getByText('Ingresa un correo válido')).toBeInTheDocument();
  });

  it('CA-05: contraseña corta', async () => {
    const user = userEvent.setup();
    render(<App />);
    await fillAndSubmit(user, 'demo@correo.com', '123');
    expect(screen.getByText(/al menos 8 caracteres/i)).toBeInTheDocument();
  });

  it('RF-02: el tooltip muestra las credenciales de prueba', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.hover(screen.getByLabelText(/ver datos de prueba/i));
    expect(await screen.findByText(/demo@correo\.com/)).toBeInTheDocument();
    expect(screen.getByText(/Demo1234/)).toBeInTheDocument();
  });

  it('UX: alternar la visibilidad de la contraseña', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByLabelText('Contraseña');
    expect(input).toHaveAttribute('type', 'password');
    await user.click(screen.getByRole('button', { name: 'Mostrar contraseña' }));
    expect(input).toHaveAttribute('type', 'text');
    await user.click(screen.getByRole('button', { name: 'Ocultar contraseña' }));
    expect(input).toHaveAttribute('type', 'password');
  });

  it('UX: "Usar datos de prueba" rellena el formulario', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Usar datos de prueba' }));
    expect(screen.getByLabelText(/correo electrónico/i)).toHaveValue('demo@correo.com');
    expect(screen.getByLabelText('Contraseña')).toHaveValue('Demo1234');
  });

  it('UX: el foco va al primer campo con error', async () => {
    const user = userEvent.setup();
    render(<App />);
    await fillAndSubmit(user, 'demo@correo.com');
    expect(screen.getByLabelText('Contraseña')).toHaveFocus();
  });

  it('UX: el error de un campo se limpia al corregirlo', async () => {
    const user = userEvent.setup();
    render(<App />);
    await fillAndSubmit(user);
    await user.type(screen.getByLabelText(/correo electrónico/i), 'a');
    expect(screen.queryByText('El correo es obligatorio')).not.toBeInTheDocument();
  });

  it('CA-09: credenciales incorrectas muestran alerta', async () => {
    const user = userEvent.setup();
    render(<App />);
    await fillAndSubmit(user, 'otro@correo.com', 'Clave12345');
    expect(await screen.findByText('Correo o contraseña incorrectos', {}, { timeout: 4000 })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /salir/i })).not.toBeInTheDocument();
  });

  it('CA-10/CA-11: login correcto → carga → bienvenida → salir', async () => {
    const user = userEvent.setup();
    render(<App />);
    await fillAndSubmit(user, 'demo@correo.com', 'Demo1234');

    expect(await screen.findByRole('status')).toBeInTheDocument();
    expect(
      await screen.findByRole(
        'heading',
        { name: '¡Bienvenido, Usuario Demo!' },
        { timeout: LOGIN_DELAY_MS + 2000 },
      ),
    ).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /salir/i }));
    expect(screen.getByRole('heading', { name: 'Bienvenido' })).toBeInTheDocument();
    await waitFor(() => expect(screen.getByLabelText(/correo electrónico/i)).toHaveValue(''));
  });
});

