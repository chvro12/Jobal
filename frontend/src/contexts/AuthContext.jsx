import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) {
      setToken(t);
      // Décoder le token pour récupérer le rôle (simple, sans vérif signature)
      try {
        const payload = JSON.parse(atob(t.split('.')[1]));
        setRole(payload.role);
        setUser(payload);
      } catch {}
    }
  }, []);

  const login = (token, user) => {
    setToken(token);
    setUser(user);
    setRole(user.role);
    localStorage.setItem('token', token);
  };
  const logout = () => {
    setToken(null);
    setUser(null);
    setRole(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, role, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 