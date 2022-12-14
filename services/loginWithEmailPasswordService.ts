import { signInWithEmailAndPassword } from "firebase/auth";

//* firebase config
import { FirebaseAuth } from "../firebase/config";

//* interfaces *//
import { ILogin } from "../interfaces/ILogin";

interface Return {
  ok: boolean;
  uid?: string;
  photoURL?: string | null;
  displayName?: string | null;
  email?: string;
  errorMessage?: string;
}

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
