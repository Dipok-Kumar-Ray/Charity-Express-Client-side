import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register new user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login existing user (Fix: use signInWithEmailAndPassword)
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (profileInfo) => {
    console.log(profileInfo);
    return updateProfile(auth.currentUser, profileInfo);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Fetch role from backend and merge with Firebase user
  const fetchUserRole = async (firebaseUser) => {
    try {
      const res = await axios.get(`http://localhost:3000/users/${firebaseUser.email}`);
      const role = res.data.role || 'user';
      setUser({ ...firebaseUser, role }); // Merge role with Firebase user
    } catch (error) {
      console.error("Error fetching user role:", error);
      setUser(firebaseUser); // Fallback: set only Firebase user
    }
  };

  // On auth state change, fetch role and set user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        axios.post('http://localhost:3000/login', {
          email: currentUser.email, name: currentUser.displayName
        })
        .then((res)=>{
console.log(res);
          localStorage.setItem("access-token", res.data.token);
        })

        // Fetch role from MongoDB
        await fetchUserRole(currentUser);
      } else {
        setUser(null);
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    signInWithGoogle,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
