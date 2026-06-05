import { useCallback, useEffect, useState } from 'react';
import { login as apiLogin } from '../services/api';
import { clearToken, getToken, saveToken } from '../services/storageService';

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getToken().then(value => {
      setToken(value);
      setLoading(false);
    });
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const response = await apiLogin(username, password);
    await saveToken(response.accessToken);
    setToken(response.accessToken);
    return response;
  }, []);

  const logout = useCallback(async () => {
    await clearToken();
    setToken(null);
  }, []);

  return { token, loading, login, logout, isAuthenticated: !!token };
};
