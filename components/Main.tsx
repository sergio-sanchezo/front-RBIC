import React from "react";
import Head from "next/head";
import { MainProps } from "../types/types";

export const Main = (props: MainProps) => {
  const { title, children } = props;
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main>{children}</main>
    </>
  );
};
