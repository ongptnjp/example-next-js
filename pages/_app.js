import "../styles/globals.css";
import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

const MyApp = ({ Component, pageProps }) => {
  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>Simple Stock US</title>
    </Head>
    <Component {...pageProps} />
  </>;
};

MyApp.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.any.isRequired
};

export default MyApp;
