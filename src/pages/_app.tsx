import "@/styles/globals.css";
import "@/styles/rater-js.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';
import { ThemeProvider } from "@/component/darkmode/ThemeProvider";
import Layout from "@/component/darkmode/Layout";
import AuthInitializer from "@/component/AuthInitializer";
import dynamic from 'next/dynamic';

// Create a dynamic component for PersistGate to avoid hydration issues
const PersistGateClient = dynamic(
  () => {
    return Promise.resolve(({ children }: { children: React.ReactNode }) => {
      return (
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      );
    });
  },
  { ssr: false }
);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGateClient>
        <ThemeProvider>
          <AuthInitializer />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </PersistGateClient>
    </Provider>
  );
}