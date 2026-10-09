import { useState } from 'react';
import Bubbles from './components/Bubbles';
import Copyright from './components/Copyright';
import { AUTH_STATUS, useAuth } from './hooks/useAuth';
import LoadingScreen from './pages/LoadingScreen';
import SignIn from './pages/SignIn';
import WelcomeScreen from './pages/WelcomeScreen';

export default function App() {
  const { status, user, error, login, logout, clearError } = useAuth();
  // Cambiar la key remonta el formulario, que así vuelve vacío tras salir.
  const [formKey, setFormKey] = useState(0);

  const isLoading = status === AUTH_STATUS.LOADING;
  const isWelcome = status === AUTH_STATUS.WELCOME;

  const handleLogout = () => {
    logout();
    setFormKey((prev) => prev + 1);
  };

  return (
    <div className="page">
      <main className={`wrapper${isWelcome ? ' form-success' : ''}`}>
        <div className="container">
          <h1>{isWelcome ? `¡Bienvenido${user?.name ? `, ${user.name}` : ''}!` : 'Bienvenido'}</h1>
          <div className="form-area">
            {/* El formulario sigue montado (oculto) para que la franja no cambie de alto. */}
            <SignIn
              key={formKey}
              onSubmit={login}
              onInput={clearError}
              authError={error}
              hidden={isLoading || isWelcome}
            />
            {isLoading && <LoadingScreen />}
            {isWelcome && <WelcomeScreen onLogout={handleLogout} />}
          </div>
        </div>
        <Bubbles />
      </main>
      <Copyright />
    </div>
  );
}
