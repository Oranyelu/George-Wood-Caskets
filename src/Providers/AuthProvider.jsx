/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { supabase } from '../supabase';
import { API_MODE, loginUser, signupUser, getCurrentUser, logoutUser } from '../utils/api';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Helper to alias uid to id for compatibility
  const mapUser = (supabaseUser) => {
    if (!supabaseUser) return null;
    return {
      ...supabaseUser,
      uid: supabaseUser.id
    };
  };

  const signup = async (email, password, additionalData = {}) => {
    if (API_MODE === 'backend') {
      const data = await signupUser(email, password, additionalData);
      setUser(mapUser(data.user));
      setIsAdmin(data.user.role === 'admin');
      return data;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;

    if (data.user) {
      try {
        const { error: dbError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email,
            role: "user",
            ...additionalData
          });
        if (dbError) {
          console.error("Error creating profile document in Supabase:", dbError);
        }
      } catch (dbError) {
        console.error("Error creating profile document in Supabase during signup:", dbError);
      }
    }
    return data;
  };

  const login = async (email, password) => {
    if (API_MODE === 'backend') {
      const data = await loginUser(email, password);
      setUser(mapUser(data.user));
      setIsAdmin(data.user.role === 'admin');
      return data;
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const logout = () => {
    if (API_MODE === 'backend') {
      setUser(null);
      setIsAdmin(false);
      return logoutUser();
    }
    return supabase.auth.signOut();
  };

  useEffect(() => {
    if (API_MODE === 'backend') {
      const initAuth = async () => {
        try {
          const data = await getCurrentUser();
          if (data && data.user) {
            setUser(mapUser(data.user));
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

    const checkCurrentUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const currentUser = mapUser(session?.user || null);
        setUser(currentUser);
        if (currentUser) {
          let { data: profile, error: profileErr } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', currentUser.id)
            .maybeSingle();

          if (!profile && !profileErr) {
            const { data: newProfile } = await supabase
              .from('profiles')
              .insert({
                id: currentUser.id,
                email: currentUser.email,
                role: 'user'
              })
              .select('role')
              .maybeSingle();
            profile = newProfile;
          }
          setIsAdmin(profile?.role === 'admin');
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error checking current user session:", error);
      } finally {
        setLoading(false);
      }
    };

    checkCurrentUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = mapUser(session?.user || null);
      setUser(currentUser);
      if (currentUser) {
        try {
          let { data: profile, error: profileErr } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', currentUser.id)
            .maybeSingle();

          if (!profile && !profileErr) {
            const { data: newProfile } = await supabase
              .from('profiles')
              .insert({
                id: currentUser.id,
                email: currentUser.email,
                role: 'user'
              })
              .select('role')
              .maybeSingle();
            profile = newProfile;
          }
          setIsAdmin(profile?.role === 'admin');
        } catch (err) {
          console.error("Error checking role on auth change:", err);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
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

  const loginWithGoogle = async () => {
    if (API_MODE === 'backend') {
      throw new Error("Google login not supported in backend API mode");
    }
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/user/dashboard'
      }
    });
    if (error) throw error;
    return data;
  };

  const value = {
    user,
    isAdmin,
    signup,
    login,
    logout,
    loginWithGoogle,
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
