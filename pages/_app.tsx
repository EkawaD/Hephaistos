import Head from "next/head";
import { AppProps } from "next/app";


import './style.css'

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      olorScheme}}
        >
      <Component {...pageProps} />

    </>
  );
}



