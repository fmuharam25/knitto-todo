import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "@/redux/store";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
export function App({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} />
  );
}
export default wrapper.withRedux(App);
