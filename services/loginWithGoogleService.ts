import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

//* firebase config *//
import { FirebaseAuth } from "../firebase/config";

//* provider *//
const googleProvider = new GoogleAuthProvider();

//* interface *//
interface Return {
  displayName?: string | null;
  email?: string | null;
  errorMessage?: string;
  ok: boolean;
  photoURL?: string | null;
  uid?: string;
}

export const loginWithGoogleService = async (): Promise<Return> => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);

    const { displayName, email, photoURL, uid } = await result.user;

    return {
      ok: true,
      displayName,
      email,
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
