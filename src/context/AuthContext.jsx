import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem('auth');
    return storedAuth
      ? JSON.parse(storedAuth)
      : { accessToken: null, userId: null };
  });
  
  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);  

  const logout = () => {
    setAuth({ accessToken: null, userId: null });
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
