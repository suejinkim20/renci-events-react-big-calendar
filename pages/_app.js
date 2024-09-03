import * as React from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Layout } from "../components";
import '../styles/globals.css'
import theme from "../styles/theme";
import { ConfigProvider } from "../context";
import fontCss from "../fonts/atlas-grotesk/fonts.css";
import App from "next/app";

const MyApp = (props) => {
  const { Component, pageProps } = props;

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel={fontCss} />
      </Head>

      <ConfigProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout ourWorkTrayItems={pageProps.ourWorkTrayItems}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ConfigProvider>
    </React.Fragment>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const [
    appProps,
    globalLocale,
  ] = await Promise.all([
    // Calls page's `getInitialProps` and fills `appProps.pageProps`
    App.getInitialProps(appContext),
  ])

  return {
    ...appProps,
    pageProps: { globalLocale },
  };
};

export default MyApp
