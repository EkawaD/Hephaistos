import Head from "next/head";
import { AppProps } from "next/app";
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`



import './style.css'
import { NotificationsProvider } from "@mantine/notifications";
import { SessionProvider } from "next-auth/react";

export default function App(props: AppProps) {
  const { Component, pageProps: { session, ...pageProps } } = props;

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

      <SessionProvider session={session}>


        <NotificationsProvider position="bottom-right" zIndex={2077} limit={5}>
          <Component {...pageProps} />
        </NotificationsProvider>
      </SessionProvider>

    </>
  );
}



