/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { API_MODE, loginUser, signupUser, getCurrentUser, logoutUser } from '../utils/api';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, additionalData = {}) => {
    if (API_MODE === 'backend') {
      const data = await signupUser(email, password, additionalData);
      setUser(data.user);
      setIsAdmin(data.user.role === 'admin');
      return data;
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    try {
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email,
        role: "user",
        createdAt: new Date().toISOString(),
        ...additionalData
      });
    } catch (dbError) {
      console.error("Error creating user document in Firestore during signup:", dbError);
    }
    return userCredential;
  };

  const login = async (email, password) => {
    if (API_MODE === 'backend') {
      const data = await loginUser(email, password);
      setUser(data.user);
      setIsAdmin(data.user.role === 'admin');
      return data;
    }
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    if (API_MODE === 'backend') {
      setUser(null);
      setIsAdmin(false);
      return logoutUser();
    }
    return signOut(auth);
  };

  useEffect(() => {
    if (API_MODE === 'backend') {
      const initAuth = async () => {
        try {
          const data = await getCurrentUser();
          if (data && data.user) {
            setUser(data.user);
            setIsAdmin(data.user.role === 'admin');
          } else {
            setUser(null);
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error loading current user from backend:", error);
          setUser(null);
          setIsAdmin(false);
        } finally {
          setLoading(false);
        }
      };
      initAuth();
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setUser(user);
        if (user) {
          const userDocRef = doc(db, "users", user.uid);
          console.log("Checking admin role for:", user.uid);

          const userDoc = await getDoc(userDocRef);
          console.log("User Doc Exists:", userDoc.exists());

          if (userDoc.exists()) {
            console.log("User Data:", userDoc.data());
            const role = userDoc.data().role;
            console.log("Role found:", role);
            if (role === 'admin') {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          } else {
            console.log("No user document found in 'users' collection.");
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error in auth state change:", error);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);


  // Session Timeout Logic
  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (user) {
        timeoutId = setTimeout(() => {
          console.log("Session timed out due to inactivity.");
          logout();
          alert("Session timed out due to inactivity. Please log in again.");
        }, 30 * 60 * 1000); // 30 minutes
      }
    };

    const events = ['mousemove', 'keydown', 'click', 'scroll'];

    if (user) {
      resetTimer(); // Start timer on login/load
      events.forEach(event => window.addEventListener(event, resetTimer));
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [user]);

  const value = {
    user,
    isAdmin,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
