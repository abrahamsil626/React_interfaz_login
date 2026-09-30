import { Box, Button, Fade, Typography } from '@mui/material';

export default function WelcomeScreen({ user, onLogout }) {
  return (
    <Fade in timeout={600}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          textAlign: 'center',
          p: 2,
        }}
      >
        <Typography component="h1" variant="h3">
          ¡Bienvenido{user?.name ? `, ${user.name}` : ''}!
        </Typography>
        <Button variant="outlined" size="large" onClick={onLogout} autoFocus>
          Salir
        </Button>
      </Box>
    </Fade>
  );
}
