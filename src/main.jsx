import React from "react";
import ReactDOM from "react-dom/client";
import { UserProvider } from "./providers/UserProvider";
import { Provider } from "react-redux";
import { store } from "../src/redux/store.js";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
    </React.StrictMode>
  </Provider>
);
