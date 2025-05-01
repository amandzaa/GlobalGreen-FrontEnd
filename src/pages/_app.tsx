import Layout from "@/component/darkmode/Layout";
import { ThemeProvider } from "@/component/darkmode/ThemeProvider";
import { wrapper } from "@/redux/store";
import "@/styles/globals.css";
import "@/styles/rater-js.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
