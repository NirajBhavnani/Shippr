import React from "react";
import "@/styles/globals.css";
import { Layout } from "@/components";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      {/* Component means the component we are currently on */}
      <Component {...pageProps} />
    </Layout>
  );
}
