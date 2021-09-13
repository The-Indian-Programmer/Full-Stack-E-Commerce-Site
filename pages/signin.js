import React from "react";
import SignInPage from "../component/SignInPage/SignIn";
import Head from "next/head";
const SignIn = () => {
  return (
    <>
      <Head>
        <title>SignIn Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        />
      </Head>
      <main>
        <SignInPage />
      </main>
    </>
  );
};

export default SignIn;
