import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import "./index.scss";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";
import "@elastic/eui/dist/eui_theme_light.css";
import * as serviceWorker from "./serviceWorker";
import GraphQl from "./api/graphQl";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={GraphQl.client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
