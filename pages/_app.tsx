import { AppProps } from "next/app";

//* providers *//
import { AuthProvider, UIProvider } from "../context";

//* styles *//
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <UIProvider>
        <Component {...pageProps} />
      </UIProvider>
    </AuthProvider>
  );
}

export default MyApp;
