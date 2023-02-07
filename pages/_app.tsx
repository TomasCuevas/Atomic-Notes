import { AppProps } from "next/app";
import Head from "next/head";

//* providers *//
import { AuthProvider, NotesProvider, UIProvider } from "../context";

//* styles *//
import "../styles/globals.css";
import "../styles/note.css";
import "../styles/noteCarousel.css";
import "../styles/noteEditing.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NotesProvider>
        <UIProvider>
          <Head>
            <link rel="icon" type="image/x-icon" href="/icon.svg" />
          </Head>
          <Component {...pageProps} />
        </UIProvider>
      </NotesProvider>
    </AuthProvider>
  );
}

export default MyApp;
