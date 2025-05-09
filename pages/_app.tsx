import React from 'react';
import '../styles/globals.css'; // Ensure your global styles are imported
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { store } from '../store/store';
import { ThemeProvider } from '../contexts/ThemeContext';
import { WishlistProvider } from '../contexts/WishlistContext';
import Layout from '../components/Layout';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <WishlistProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </WishlistProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;