import "@/styles/globals.css";
import "@/styles/rater-js.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';
import { ThemeProvider } from "@/component/darkmode/ThemeProvider";
import Layout from "@/component/darkmode/Layout";
import AuthInitializer from "@/component/AuthInitializer";
import { useEffect, useState } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  // Add state to track client-side rendering
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Provider store={store}>
      {isClient ? (
        // Only render PersistGate on the client side
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <AuthInitializer />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </PersistGate>
      ) : (
        // On server-side, render without PersistGate
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      )}
    </Provider>
  );
}