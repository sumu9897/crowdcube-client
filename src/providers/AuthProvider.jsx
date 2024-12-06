import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
    updateProfile,
  } from "firebase/auth";
  import React, { createContext, useState, useEffect } from "react";
  import { auth } from "../firebase/firebase.config";
  
  export const AuthContext = createContext(null);
  
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const googleProvider = new GoogleAuthProvider();
  
    // Create a new user
    const createUser = async (email, password, name, photo) => {
      setLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        // Update profile with name and photo
        await updateProfile(user, {
          displayName: name,
          photoURL: photo,
        });
  
        setUser({
          email: user.email,
          displayName: name,
          photo: photo,
        });
  
        return userCredential;
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
  
    // Sign in an existing user
    const signInUser = async (email, password) => {
      setLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
      } catch (error) {
        console.error("Error signing in user:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
  
    // Google Sign-In
    const signInWithGoogle = async () => {
      setLoading(true);
      try {
        const userCredential = await signInWithPopup(auth, googleProvider);
        const { user } = userCredential;
  
        setUser({
          email: user.email,
          displayName: user.displayName || "Google User",
          photo: user.photoURL || "/default-avatar.png",
        });
  
        return userCredential;
      } catch (error) {
        console.error("Error signing in with Google:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
  
    // Log out the current user
    const logOut = async () => {
      setLoading(true);
      try {
        await signOut(auth);
        setUser(null);
      } catch (error) {
        console.error("Error logging out:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
  
    // Listen for authentication state changes
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser({
            email: currentUser.email,
            displayName: currentUser.displayName || "Anonymous User",
            photo: currentUser.photoURL || "/default-avatar.png",
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
  
      // Clean up the subscription on unmount
      return () => unsubscribe();
    }, []);
  
    // Context value to be shared
    const userInfo = {
      user,
      loading,
      createUser,
      signInUser,
      signInWithGoogle,
      logOut,
    };
  
    return (
      <AuthContext.Provider value={userInfo}>
        {!loading && children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthProvider;
  