import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

//* firebase config *//
import { FirebaseAuth } from "../firebase/config";

//* services *//
import {
  loginWithEmailPasswordService,
  loginWithGoogleService,
  registerWithEmailPasswordService,
} from "../services";

//* interfaces *//
import { IAuthStatus } from "../interfaces/IAuth";
import { ILogin } from "../interfaces/ILogin";
import { IRegister } from "../interfaces/IRegister";
import { IUser } from "../interfaces/IUser";

//* CONTEXT *//
//* CONTEXT *//
interface AuthContextProps {
  authState: IAuthStatus;
  user?: IUser;
  startLoginWithEmailPassword({ email, password }: ILogin): void;
  startLoginWithGoogle(): void;
  startLogout(): void;
  startRegister({ displayName, email, password }: IRegister): void;
}

export const AuthContext = createContext({} as AuthContextProps);

//* PROVIDER *//
//* PROVIDER *//
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<IAuthStatus>("checking");
  const [user, setUser] = useState<IUser>();

  //* check authentication
  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      if (!user) {
        setUser(undefined);
        setAuthState("not-authenticated");
        return;
      }

      setAuthState("authenticated");
      setUser({
        email: user.email!,
        uid: user.uid,
        displayName: user.displayName ? user.displayName : "",
        photoURL: user.photoURL ? user.photoURL : "",
      });
    });
  }, []);

  //* login with email and password
  const startLoginWithEmailPassword = async ({ email, password }: ILogin) => {
    setAuthState("checking");

    const result = await loginWithEmailPasswordService({ email, password });

    if (!result.ok) {
      setUser(undefined);
      setAuthState("not-authenticated");
      return;
    }

    setAuthState("authenticated");
    setUser({
      email: result.email!,
      uid: result.uid!,
      displayName: result.displayName ? result.displayName : "",
      photoURL: result.photoURL ? result.photoURL : "",
    });
  };

  //* login with google
  const startLoginWithGoogle = async () => {
    setAuthState("checking");

    const result = await loginWithGoogleService();

    if (!result.ok) {
      setUser(undefined);
      setAuthState("not-authenticated");
      return;
    }

    setAuthState("authenticated");
    setUser({
      email: result.email!,
      uid: result.uid!,
      displayName: result.displayName ? result.displayName : "",
      photoURL: result.photoURL ? result.photoURL : "",
    });
  };

  //* register with email and password
  const startRegister = async ({ displayName, email, password }: IRegister) => {
    setAuthState("checking");

    const result = await registerWithEmailPasswordService({
      displayName,
      email,
      password,
    });

    if (!result.ok) {
      setUser(undefined);
      setAuthState("not-authenticated");
      return;
    }

    setAuthState("authenticated");
    setUser({
      email: result.email!,
      uid: result.uid!,
      displayName: result.displayName!,
      photoURL: result.photoURL ? result.photoURL : "",
    });
  };

  //* logout
  const startLogout = async () => {
    await FirebaseAuth.signOut();
    setUser(undefined);
    setAuthState("not-authenticated");
  };

  return (
    <AuthContext.Provider
      value={{
        // getters
        authState,
        user,

        // methods
        startLoginWithEmailPassword,
        startLoginWithGoogle,
        startLogout,
        startRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
