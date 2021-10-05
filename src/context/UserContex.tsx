import React, { createContext, useCallback, useState, useEffect } from 'react';
import axiosInstance from '../config/axios';

export const userContext = createContext<any>(null);

const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const saveUser = (user: any) => {
    setUser(user);
    setIsAuthenticated(true);
    setLoading(false);
    setError(false);
  };

  const deleteUser = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const fetchAuthenticatedUser = async () => {
    try {
      const response = await axiosInstance.get('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem('token') || 'xxxx-xxxx-xxxx'
          }`,
        },
      });
      const { data } = response as any;
      setUser(data.user);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      localStorage.removeItem('token');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);

  return (
    <userContext.Provider
      value={{ user, saveUser, deleteUser, isAuthenticated, error, loading }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
