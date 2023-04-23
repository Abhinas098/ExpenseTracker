import React, { useContext } from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import AuthContext from "./store/AuthContext";
import LoginForm from "./components/Auth/LoginForm";
import RegistrationForm from "./components/Auth/RegistrationForm";

function App() {
  const ctx = useContext(AuthContext);
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Redirect to="login" />
        </Route>

        {!ctx.isLogin && (
          <Route path="/login">
            <LoginForm />
          </Route>
        )}

        {!ctx.isLogin && (
          <Route path="/register">
            <RegistrationForm />
          </Route>
        )}
        {ctx.isLogin && (
          <Route path="/home">
            <Home />
          </Route>
        )}
      </Switch>
    </>
  );
}

export default App;
