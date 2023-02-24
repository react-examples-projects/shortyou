import React from "react";
import ReactDOM from "react-dom/client";
import Routers from "./Routers";
import { MantineProvider } from "@mantine/core";

import "./index.css";
import "./utils.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        colorScheme: "dark",
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Routers />
    </MantineProvider>
  </React.StrictMode>
);
