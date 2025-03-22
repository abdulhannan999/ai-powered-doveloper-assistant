import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../config/firebase";

// Sign in with email and password
export const loginUser = async (email, password) => {

  try {
    const UserCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      user: UserCredential.user,
      error: null
    }
  }
  catch (error) {
    return {
      user: null, error: error.message
    }
  }

};

// Create new user with email and password
export const registerUser = async (email, password) => {


  try {
    const UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    return {
      user: UserCredential.user,
      error: null
    }
  }
  catch (error) {
    return {
      user: null, error: error.message
    }
  }

};

// Sign out user
export const logoutUser = async () => {

  try {

    await signOut(auth);
  localStorage.removeItem("gemini-api-key")
    return { error: null }
  } catch (error) {
    return { error: error.message }
  }

};

// Auth state observer
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth , (user)=>{
    callback(user);
  })
 };

// Add Google Sign In
export const signInWithGoogle = async () => {
  try {
    const provider =new GoogleAuthProvider()
    const UserCredential=await signInWithPopup(auth , provider)
    return {user:UserCredential.user, error:null}
  } catch (error) {
    return {
      error:error.message ,
      user:null
    }
  }
 };
