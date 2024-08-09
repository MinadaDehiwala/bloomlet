import React, { useContext, useState, useEffect, createContext } from 'react';
import { auth, signInWithEmailAndPassword } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Ensure that the login function is provided in the context
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const value = {
    currentUser,
    login,  // Add login function to the context value
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
