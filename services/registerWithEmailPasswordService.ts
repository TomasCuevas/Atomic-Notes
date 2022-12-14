import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

//* firebase config *//
import { FirebaseAuth } from "../firebase/config";

//* interfaces *//
import { IRegister } from "../interfaces/IRegister";

interface Return {
  ok: boolean;
  uid?: string;
  photoURL?: string | null;
  email?: string;
  displayName?: string;
  errorMessage?: string;
}

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
