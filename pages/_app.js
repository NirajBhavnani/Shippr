import React from "react";
import "@/styles/globals.css";
import { Layout } from "@/components";
import { StateContext } from "@/context/StateContext";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    // Simply want to pass the data from StateContext to every single component
    <StateContext>
      <Layout>
        {/* Small notification pop-up */}
        <Toaster />
        {/* Component means the component we are currently on */}
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}
