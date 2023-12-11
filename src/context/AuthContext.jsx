// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

import PropTypes from 'prop-types';

const AuthContext = createContext();

const storedUser = sessionStorage.getItem('user');

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(storedUser?storedUser:null);
  
  const [apiBaseUrl, setApiBaseUrl] = useState('');

  // useEffect(() => {
  //   const storedUser = sessionStorage.getItem('user');
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  const login = (userCredentials) => {
    // Store the user data in localStorage
    sessionStorage.setItem('user', JSON.stringify(userCredentials));
    setUser(userCredentials);
  };

const logout = () => {
  // Remove the user data from localStorage and set user state to null
  sessionStorage.removeItem('user');
  setUser(null);
};

  return (
    <AuthContext.Provider value={{ user, login, logout, apiBaseUrl, setApiBaseUrl }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => React.useContext(AuthContext);
