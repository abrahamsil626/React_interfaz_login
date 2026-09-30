import { useRef, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Collapse,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Copyright from '../components/Copyright';
import backgroundImage from '../assets/login-bg.svg';
import { getTestUser } from '../services/authService';
import { validateEmail, validatePassword, validateLoginForm } from '../validators/authValidators';

const testUser = getTestUser();

export default function SignInSide({ onSubmit, onInput, authError = '', disabled = false }) {
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
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
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box
        aria-hidden="true"
        sx={{
          display: { xs: 'none', sm: 'flex' },
          flex: { sm: 4, md: 7 },
          alignItems: 'flex-end',
          p: 6,
          color: '#fff',
          backgroundImage: `linear-gradient(to top, rgba(6,9,28,0.75), rgba(6,9,28,0) 55%), url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
        }}
      >
        <Box>
          <Typography variant="h4" component="p" sx={{ fontWeight: 700 }}>
            Bienvenido de nuevo
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.85 }}>
            Accede a tu cuenta para continuar.
          </Typography>
        </Box>
      </Box>

      <Paper
        component="main"
        square
        elevation={6}
        sx={{ flex: { xs: 1, sm: 8, md: 5 }, display: 'flex', alignItems: 'center' }}
      >
        <Box
          sx={{
            my: 8,
            mx: { xs: 3, sm: 6 },
            width: '100%',
            maxWidth: 440,
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Tooltip
            arrow
            placement="bottom-end"
            title={
              <>
                Datos de prueba
                <br />
                Correo: {testUser.email}
                <br />
                Contraseña: {testUser.password}
              </>
            }
          >
            <IconButton
              aria-label="Ver datos de prueba"
              sx={{ position: 'absolute', top: -48, right: 0 }}
            >
              <InfoOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <Collapse in={Boolean(authError)}>
              <Alert severity="error" sx={{ mt: 1 }} role="alert">
                {authError}
              </Alert>
            </Collapse>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              name="email"
              label="Correo electrónico"
              type="email"
              autoComplete="email"
              autoFocus
              inputRef={emailRef}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              fullWidth
              id="password"
              name="password"
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              inputRef={passwordRef}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.password)}
              helperText={errors.password}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        onClick={() => setShowPassword((prev) => !prev)}
                        onMouseDown={(event) => event.preventDefault()}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              disabled={disabled}
              sx={{ mt: 3, mb: 1 }}
            >
              Iniciar sesión
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link
                component="button"
                type="button"
                variant="body2"
                onClick={fillTestUser}
                disabled={disabled}
              >
                Usar datos de prueba
              </Link>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

