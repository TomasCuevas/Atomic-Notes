import { signInWithEmailAndPassword } from "firebase/auth";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

//* provider *//
const googleProvider = new GoogleAuthProvider();

//* firebase config
import { FirebaseAuth } from "../firebase/config";

//* interfaces *//
import { ILogin } from "../interfaces/ILogin";
import { IRegister } from "../interfaces/IRegister";

interface Return {
  ok: boolean;
  uid?: string;
  photoURL?: string | null;
  displayName?: string | null;
  email?: string;
  errorMessage?: string;
}

//* services *//
//* services *//

//* login with email and password *//
export const loginWithEmailPasswordService = async ({
  email,
  password,
}: ILogin): Promise<Return> => {
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
  } catch (error: any) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

//* login with google *//
export const loginWithGoogleService = async (): Promise<Return> => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);

    const { displayName, email, photoURL, uid } = await result.user;

    return {
      ok: true,
      displayName,
      email: email ? email : "",
      photoURL,
      uid,
    };
  } catch (error: any) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

//* register with email and password *//
export const registerWithEmailPasswordService = async ({
  displayName,
  email,
  password,
}: IRegister): Promise<Return> => {
  try {
    const result = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    await updateProfile(FirebaseAuth.currentUser!, {
      displayName,
      photoURL:
        "https://res.cloudinary.com/dn3kl3egc/image/upload/v1636226226/Avatar/avatar_default.png",
    });

    const { uid, photoURL } = result.user;

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error: any) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};
