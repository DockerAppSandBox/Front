import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

interface AuthContextType {
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('authToken');
    console.log('Checking auth token:', token);

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      // Autoriser certaines pages sans authentification
      const publicPages = ['/login', '/register'];
      if (!publicPages.includes(router.pathname)) {
        router.push('/login');
      }
    }
    setLoading(false);
  }, [router]);

  const logout = () => {
    Cookies.remove('authToken');
    setIsAuthenticated(false);
    router.push('/login');
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
