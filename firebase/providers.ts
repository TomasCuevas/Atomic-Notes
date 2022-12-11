import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

//* interfaces *//
import { IRegister } from "../interfaces/IRegister";
import { ILogin } from "../interfaces/ILogin";

//* google provider *//
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const { displayName, email, photoURL, uid } = await result.user;

    return {
      ok: true,
      // user info
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (err: any) {
    return {
      ok: false,
      errorMessage: err.message,
    };
  }
};

export const registerUserWithEmailPassword = async ({
  displayName,
  email,
  password,
}: IRegister) => {
  try {
    const result = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    await updateProfile(FirebaseAuth.currentUser!, { displayName });

    const { uid, photoURL } = result.user;

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (err: any) {
    return {
      ok: false,
      errorMessage: err.message,
    };
  }
};

export const loginWithEmailPassword = async ({ email, password }: ILogin) => {
  try {
    const result = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL, displayName } = result.user;

    return {
      ok: true,
      uid,
      photoURL,
      displayName,
      email,
    };
  } catch (err: any) {
    return {
      ok: false,
      errorMessage: err.message,
    };
  }
};

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};
