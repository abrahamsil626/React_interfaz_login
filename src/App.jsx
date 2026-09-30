import { Backdrop } from '@mui/material';
import { AUTH_STATUS, useAuth } from './hooks/useAuth';
import LoadingScreen from './pages/LoadingScreen';
import SignInSide from './pages/SignInSide';
import WelcomeScreen from './pages/WelcomeScreen';

export default function App() {
  const { status, user, error, login, logout, clearError } = useAuth();

  if (status === AUTH_STATUS.WELCOME) {
    return <WelcomeScreen user={user} onLogout={logout} />;
  }

  return (
    <>
      <SignInSide
        onSubmit={login}
        onInput={clearError}
        authError={error}
        disabled={status === AUTH_STATUS.LOADING}
      />
      <Backdrop
        open={status === AUTH_STATUS.LOADING}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
      >
        <LoadingScreen />
      </Backdrop>
    </>
  );
}
