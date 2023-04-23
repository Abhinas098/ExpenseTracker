import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { AuthProvider } from "./store/AuthContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);
