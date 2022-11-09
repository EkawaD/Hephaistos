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
        <title>
          Héphaistos - CV Generator
        </title>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
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



