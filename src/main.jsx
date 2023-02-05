import { ApolloProvider } from "@apollo/client";
import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import client from "./graphql/apolloClient";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#00b96b",
          },
        }}
      >
        <App />
      </ConfigProvider>
    </ApolloProvider>
  </React.StrictMode>
);
