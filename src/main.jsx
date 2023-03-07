import React from "react";
import ReactDOM from "react-dom/client";
import Routers from "./Routers";
import { SWRConfig } from "swr";
import { ToastContainer } from "react-toastify";
import { MantineProvider } from "@mantine/core";

import "./index.css";
import "./utils.css";
import "video-react/dist/video-react.css";
import "react-toastify/dist/ReactToastify.css";

const config = {
  revalidateOnFocus: false,
  errorRetryCount: 3,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        colorScheme: "dark",
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <SWRConfig value={config}>
        <Routers />
      </SWRConfig>
    </MantineProvider>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      theme="colored"
      closeOnClick  
    />
  </React.StrictMode>
);
