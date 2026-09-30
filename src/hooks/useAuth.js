import { useCallback, useState } from 'react';
import { authenticate } from '../services/authService';

export const AUTH_STATUS = {
  LOGIN: 'login',
  LOADING: 'loading',
  WELCOME: 'welcome',
};

export function useAuth() {
  const [status, setStatus] = useState(AUTH_STATUS.LOGIN);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const login = useCallback(async (email, password) => {
    setError('');
    setStatus(AUTH_STATUS.LOADING);
    try {
      const authenticatedUser = await authenticate(email, password);
      setUser(authenticatedUser);
      setStatus(AUTH_STATUS.WELCOME);
    } catch (err) {
      setError(err.message);
      setStatus(AUTH_STATUS.LOGIN);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError('');
    setStatus(AUTH_STATUS.LOGIN);
  }, []);

  const clearError = useCallback(() => setError(''), []);

  return { status, user, error, login, logout, clearError };
}
