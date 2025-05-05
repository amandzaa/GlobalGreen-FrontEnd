import "@/styles/globals.css";
import "@/styles/rater-js.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';
// Import ThemeProvider and Layout if you need them
import { ThemeProvider } from "@/component/darkmode/ThemeProvider";
import Layout from "@/component/darkmode/Layout";
import AuthInitializer from "@/component/AuthInitializer";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
        <AuthInitializer />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}