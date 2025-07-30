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
  const createUser = async (email, password, name) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // Register এর পর নাম সেট করা
    await updateProfile(result.user, {
      displayName: name,
   photoURL: "https://i.ibb.co/BKdKkB4d/496151637-122190158900051173-6167468923845444206-n.jpg" 
    });

    return result;
  };

  // Login existing user
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (profileInfo) => {
    return updateProfile(auth.currentUser, profileInfo);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Fetch role from backend and merge
 /*  const fetchUserRole = async (firebaseUser) => {
    try {
      const res = await axios.get(`https://charity-ex-server-side-gf29dzrwj-dipok-kumar-rays-projects.vercel.app/users/${firebaseUser.email}`);
      const role = res.data.role || 'user';

      // Merge properly
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        role
      });
    } catch (error) {
      console.error("Error fetching user role:", error);
      setUser(firebaseUser);
    }
  }; */

const fetchUserRole = async (firebaseUser) => {
  try {
    const res = await axios.get(`https://charity-ex-server-side-gf29dzrwj-dipok-kumar-rays-projects.vercel.app/users/${firebaseUser.email}`);
    const role = res.data.role || "user";

    // Firebase থেকে সব field merge করা (fallback সহ)
    setUser({
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName || res.data.name || "User",
      photoURL: firebaseUser.photoURL || res.data.photoURL || "/default.png",
      role
    });
  } catch (error) {
    console.error("Error fetching user role:", error);
    setUser({
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName || "User",
      photoURL: firebaseUser.photoURL || "/default.png",
      role: "user"
    });
  }
};


  // Listen auth state
 /*  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Token store
          const res = await axios.post('https://charity-ex-server-side-gf29dzrwj-dipok-kumar-rays-projects.vercel.app/login', {
            email: currentUser.email,
            name: currentUser.displayName
          });

          localStorage.setItem("access-token", res.data.token);

          // Fetch role
          await fetchUserRole(currentUser);
        } catch (err) {
          console.error("Login sync error:", err);
        }
      } else {
        setUser(null);
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });

    return () => unSubscribe();
  }, []); */

useEffect(() => {
  const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      try {
        // এই লাইনটা খুব গুরুত্বপূর্ণ (profile refresh)
        await currentUser.reload();

        const freshUser = auth.currentUser; // refreshed data

        // Token store
       const res = await axios.post('https://charity-ex-server-side-gf29dzrwj-dipok-kumar-rays-projects.vercel.app/login', {
  email: freshUser.email,
  name: freshUser.displayName,
  photoURL: freshUser.photoURL // নতুন করে এটা যোগ করো
});

        localStorage.setItem("access-token", res.data.token);

        // Fetch role & merge with fresh data
        await fetchUserRole(freshUser);
      } catch (err) {
        console.error("Login sync error:", err);
      }
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
