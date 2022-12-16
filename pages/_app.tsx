import { AppProps } from "next/app";

//* providers *//
import { AuthProvider, NotesProvider, UIProvider } from "../context";

//* styles *//
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NotesProvider>
        <UIProvider>
          <Component {...pageProps} />
        </UIProvider>
      </NotesProvider>
    </AuthProvider>
  );
}

export default MyApp;
